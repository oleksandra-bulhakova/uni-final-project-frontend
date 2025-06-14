import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { getUserId } from "../utils/auth";
import Select from "react-select";

export default function AllCandidatesPage() {
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [candidatesPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [technologies, setTechnologies] = useState([]);
    const [selectedTechnologies, setSelectedTechnologies] = useState([]);

    useEffect(() => {
        const fetchTechnologies = async () => {
            try {
                const response = await api.get("/technologies");
                setTechnologies(response.data);
            } catch (err) {
                console.error("Не вдалося завантажити технології", err);
            }
        };
        fetchTechnologies();
    }, []);

    useEffect(() => {
        const fetchFilteredCandidates = async () => {
            const userId = getUserId();

            if (selectedTechnologies.length > 0) {
                try {
                    const response = await api.post("/candidates/search/technologies",
                        selectedTechnologies.map(t => t.value), {
                            headers: { "Current-User-Id": userId }
                        });
                    setCandidates(response.data);
                } catch (err) {
                    console.error("Помилка при фільтрації кандидатів:", err);
                }
            } else {
                const response = await api.get("/candidates", {
                    headers: { "Current-User-Id": userId }
                });
                setCandidates(response.data);
            }
        };

        fetchFilteredCandidates();
    }, [selectedTechnologies]);

    useEffect(() => {
        const fetchCandidates = async () => {
            const userId = getUserId();
            if (searchTerm.trim() === "") {
                const response = await api.get("/candidates", {
                    headers: { "Current-User-Id": userId }
                });
                setCandidates(response.data);
            } else {
                const response = await api.get(`/candidates/search?name=${searchTerm}`, {
                    headers: { "Current-User-Id": userId }
                });
                setCandidates(response.data);
            }
        };
        fetchCandidates();
    }, [searchTerm]);

    const indexOfLast = currentPage * candidatesPerPage;
    const indexOfFirst = indexOfLast - candidatesPerPage;
    const currentCandidates = candidates.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(candidates.length / candidatesPerPage);
    const handleAddCandidate = () => {
        navigate("/create-candidate");
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-10 min-h-screen text-xl">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Кандидати</h2>
                <button
                    onClick={handleAddCandidate}
                    className="bg-[#FE7C7C] hover:bg-[#58618E] text-white px-4 py-2 rounded text-xl"
                >
                    Додати кандидата
                </button>
            </div>

            <div className="flex items-end justify-between mb-6 gap-6">
                <div className="w-1/2">
                    <label className="block mb-1 text-gray-600">Пошук</label>
                    <input
                        type="text"
                        placeholder="Пошук..."
                        className="w-full border px-4 py-2 rounded text-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="w-1/2">
                    <label className="block mb-1 text-gray-600">Фільтрувати за напрямком</label>
                    <Select
                        isMulti
                        options={technologies.map(t => ({value: t.id, label: t.name}))}
                        value={selectedTechnologies}
                        onChange={setSelectedTechnologies}
                        placeholder="Оберіть технологію"
                    />
                </div>
            </div>
            <table className="w-full text-left border-collapse mb-6 text-xl">
                <thead>
                <tr className="text-gray-500 border-b">
                    <th className="py-3 w-10">№</th>
                    <th className="py-3">Ім’я</th>
                    <th className="py-3">Джерело</th>
                    <th className="py-3">Дата реєстрації</th>
                </tr>
                </thead>
                <tbody>
                {currentCandidates.map((candidate, index) => {
                    console.log("Кандидат:", candidate);
                    return (
                        <tr key={candidate.id} className="hover:bg-gray-50">
                            <td className="py-3">{indexOfFirst + index + 1}</td>
                            <td className="py-3">
                                <button
                                    className="text-blue-700 underline hover:text-blue-900"
                                    onClick={() => navigate(`/candidates/${candidate.id}`)}
                                >
                                    {candidate.firstName} {candidate.lastName}
                                </button>
                            </td>
                            <td className="py-3">{candidate.source}</td>
                            <td className="py-3">{candidate.registrationDate}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>

            <div className="flex justify-center gap-2 text-lg text-gray-700">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="px-3"
                >
                    Попередня
                </button>

                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded ${
                            currentPage === i + 1
                                ? "bg-gray-800 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="px-3"
                >
                    Наступна
                </button>
            </div>
        </div>
    );
}
