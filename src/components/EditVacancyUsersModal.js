import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

export default function EditVacancyUsersModal({ vacancyId, onSuccess }) {
    const [isOpen, setIsOpen] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [actionType, setActionType] = useState("add");

    useEffect(() => {
        if (isOpen) {
            api.get("/users")
                .then(response => setAllUsers(response.data))
                .catch(error => {
                    toast.error("Не вдалося завантажити користувачів");
                    console.error(error);
                });
        }
    }, [isOpen]);

    const handleSubmit = async () => {
        if (!selectedUserId) return toast.error("Оберіть користувача");

        const endpoint = `/vacancies/user/${actionType}/${vacancyId}/${selectedUserId}`;
        try {
            await api.put(endpoint);
            toast.success(`Користувача ${actionType === "add" ? "додано" : "видалено"}`);
            setIsOpen(false);
            onSuccess();
        } catch (error) {
            toast.error("Помилка при оновленні рекрутерів");
            console.error(error);
        }
    };

    return (
        <div className="inline-block ml-2">
            <FiEdit
                className="text-gray-500 cursor-pointer text-xl"
                onClick={() => setIsOpen(true)}
            />

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="relative bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Змінити рекрутера у вакансії</h2>

                        <label className="block mb-2 text-gray-700 text-base">Тип дії:</label>
                        <select
                            className="w-full p-2 border rounded mb-4 text-gray-700 font-normal text-sm"
                            value={actionType}
                            onChange={e => setActionType(e.target.value)}
                        >
                            <option value="add">Додати</option>
                            <option value="remove">Видалити</option>
                        </select>

                        <label className="block mb-2 text-gray-700 text-base">Користувач:</label>
                        <select
                            className="w-full p-2 border rounded mb-6 text-gray-700 text-sm font-normal"
                            value={selectedUserId}
                            onChange={e => setSelectedUserId(e.target.value)}
                        >
                            <option value="">-- Оберіть користувача --</option>
                            {allUsers.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.firstName} {user.lastName}
                                </option>
                            ))}
                        </select>

                        <div className="flex justify-end gap-4 font-normal text-base">
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-[#FE7C7C] hover:bg-[#58618E] text-white rounded"
                            >
                                {actionType === "add" ? "Додати" : "Видалити"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
