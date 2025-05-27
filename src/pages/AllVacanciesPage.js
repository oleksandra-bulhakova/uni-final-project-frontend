import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../api/axiosInstance";
import {getUserId} from "../utils/auth";

export default function AllVacanciesPage() {
    const navigate = useNavigate();
    const [vacancies, setVacancies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [vacanciesPerPage] = useState(5);

    useEffect(() => {
        const fetchVacancies = async () => {
            try {
                const userId = getUserId();
                const response = await api.get("/vacancies", {
                    headers: {"Current-User-Id": userId}
                });
                setVacancies(response.data);
            } catch (error) {
                console.error("Не вдалося завантажити вакансії", error);
            }
        };
        fetchVacancies();
    }, []);

    const indexOfLast = currentPage * vacanciesPerPage;
    const indexOfFirst = indexOfLast - vacanciesPerPage;
    const currentVacancies = vacancies.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(vacancies.length / vacanciesPerPage);

    return (
        <div className="w-full max-w-6xl mx-auto p-10 min-h-screen text-xl">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-bold text-center w-full">Вакансії</h2>
                <button
                    onClick={() => navigate("/add-vacancy")}
                    className="bg-[#FE7C7C] hover:bg-[#58618E] text-white px-4 py-2 rounded text-xl whitespace-nowrap"
                >
                    Додати вакансію
                </button>
            </div>

            <table className="w-full text-left border-collapse mb-6 text-xl">
                <thead>
                <tr className="text-gray-500 border-b">
                    <th className="py-3 w-10">№</th>
                    <th className="py-3">Назва</th>
                    <th className="py-3">Рекрутер</th>
                    <th className="py-3">Статус</th>
                </tr>
                </thead>
                <tbody>
                {currentVacancies.map((vacancy, index) => (
                    <tr key={vacancy.id} className="hover:bg-gray-50">
                        <td className="py-3">{indexOfFirst + index + 1}</td>
                        <td className="py-3">
                            <button
                                className="text-blue-700 underline hover:text-blue-900"
                                onClick={() => navigate(`/vacancy/${vacancy.id}`)}
                            >
                                {vacancy.name}
                            </button>
                        </td>
                        <td className="py-3">
                            {vacancy.users?.map(u => u.firstName).join(", ") || "—"}
                        </td>
                        <td className="py-3">{vacancy.status}</td>
                    </tr>
                ))}
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
