import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { getUserId } from "../utils/auth";

export default function AllCandidatesPage() {
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [candidatesPerPage] = useState(5);

    useEffect(() => {
        const fetchCandidates = async () => {
            const userId = getUserId();
            const response = await api.get("/candidates", {
                headers: { "Current-User-Id": userId }
            });
            setCandidates(response.data);
        };
        fetchCandidates();
    }, []);

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
