import React, { useState } from "react";
import api from "../api/axiosInstance";
import { toast } from "react-hot-toast";

export default function EditUserModal({ user, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/users/${user.id}`, formData);
            toast.success("Дані оновлено");
            onSuccess();
            onClose();
        } catch (err) {
            console.error("Помилка при оновленні", err);
            toast.error("Не вдалося оновити дані");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="relative bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Редагувати дані</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ім'я</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Прізвище</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50"
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#FE7C7C] hover:bg-[#58618E] text-white rounded"
                        >
                            Зберегти
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}