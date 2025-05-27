import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../api/axiosInstance";
import {getUserId} from "../utils/auth";
import empty from "../assets/empty.png";

export default function AllUsersPage() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);

    useEffect(() => {
        const fetchUsers = async () => {
            const userId = getUserId();
            const response = await api.get("/users", {
                headers: {"Current-User-Id": userId}
            });
            setUsers(response.data);
        };
        fetchUsers();
    }, []);

    const indexOfLast = currentPage * usersPerPage;
    const indexOfFirst = indexOfLast - usersPerPage;
    const currentUsers = users.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(users.length / usersPerPage);

    return (
        <div className="w-full max-w-6xl mx-auto p-10 min-h-screen text-xl">
            <div className="flex justify-center mb-10">
                <h2 className="text-3xl font-bold">Користувачі</h2>
            </div>

            <table className="w-full text-left border-collapse mb-6 text-xl">
                <thead>
                <tr className="text-gray-500 border-b">
                    <th className="py-3 w-10">№</th>
                    <th className="py-3">Ім’я</th>
                    <th className="py-3">Роль</th>
                    <th className="py-3">Дата реєстрації</th>
                    <th className="py-3">Статус</th>
                </tr>
                </thead>
                <tbody>
                {currentUsers.map((user, index) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                        <td className="py-3">{indexOfFirst + index + 1}</td>
                        <td className="py-3 flex items-center gap-3">
                            <img
                                src={user.imagePath || empty}
                                alt="avatar"
                                className="w-10 h-10 rounded-full object-cover border"
                            />
                            <button
                                className="text-blue-700 underline hover:text-blue-900"
                                onClick={() => navigate(`/user/${user.id}`)}
                            >
                                {user.firstName} {user.lastName}
                            </button>
                        </td>
                        <td className="py-3">{user.userRole}</td>
                        <td className="py-3">{user.dateOfRegistration}</td>
                        <td className="py-3">{user.active ? "Активний" : "Неактивний"}</td>
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
