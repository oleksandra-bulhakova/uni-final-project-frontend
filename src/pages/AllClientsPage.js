import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getUserId} from "../utils/auth";
import api from "../api/axiosInstance";

export default function AllClientsPage() {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [clientsPerPage] = useState(10);

    useEffect(() => {
        const fetchClients = async () => {
            const userId = getUserId();
            const response = await api.get("/clients", {
                headers: {"Current-User-Id": userId}
            });
            setClients(response.data);
        };
        fetchClients();
    }, []);

    const handleAddClient = () => {
        navigate("/add-client");
    };

    const indexOfLast = currentPage * clientsPerPage;
    const indexOfFirst = indexOfLast - clientsPerPage;
    const currentClients = clients.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(clients.length / clientsPerPage);

    return (
        <div className="w-full max-w-6xl mx-auto p-10 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Замовники</h2>
                <button
                    onClick={handleAddClient}
                    className="bg-[#FE7C7C] hover:bg-[#58618E] text-white px-4 py-2 rounded text-xl"
                >
                    Додати замовника
                </button>
            </div>
            <div className="flex items-center gap-4 mb-6 text-xl">
                <input
                    type="text"
                    placeholder="🔍 Пошук"
                    className="border px-4 py-2 rounded w-1/2"
                    disabled
                />
                <select className="border px-3 py-2 rounded text-xl text-gray-700" disabled>
                    <option>Обрати критерій</option>
                </select>
            </div>

            <table className="w-full text-left border-collapse mb-6">
                <thead>
                <tr className="text-gray-500 text-xl border-b">
                    <th className="py-2 w-10">№</th>
                    <th className="py-2">Назва</th>
                </tr>
                </thead>
                <tbody>
                {currentClients.map((client, index) => (
                    <tr key={client.id} className="hover:bg-gray-50 text-xl">
                        <td className="py-2">{indexOfFirst + index + 1}</td>
                        <td className="py-2">
                            <button
                                className="text-blue-700 underline hover:text-blue-900"
                                onClick={() => navigate(`/clients/${client.id}`)}
                            >
                                {client.name}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="flex justify-center gap-2 text-xl text-gray-700">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="px-2"
                >
                    Попередня
                </button>

                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded ${
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
                    className="px-2"
                >
                    Наступна
                </button>
            </div>
        </div>
    );
}