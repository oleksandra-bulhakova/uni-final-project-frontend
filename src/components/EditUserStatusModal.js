import React, { useState } from "react";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

export default function EditUserStatusModal({ userId, currentStatus, onClose, onSuccess }) {
    const [status, setStatus] = useState(currentStatus);
    const nextStatus = !status;


    const handleSave = async () => {
        try {
            await api.put(`/users/status/${userId}?status=${nextStatus}`);
            toast.success("Статус оновлено");
            onSuccess();
            onClose();
        } catch (error) {
            toast.error("Помилка при оновленні статусу");
            console.error(error);
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
                <h2 className="text-xl font-bold mb-4 text-gray-800">Змінити статус користувача</h2>
                <p className="mb-6 text-gray-700">Поточний статус: <b>{status ? "Активний" : "Неактивний"}</b></p>
                <p className="mb-6 text-gray-700">Змінити на: <b>{nextStatus ? "Активний" : "Неактивний"}</b></p>
                <div className="flex justify-end gap-4">
                    <button onClick={handleSave}
                            className="px-4 py-2 bg-[#FE7C7C] hover:bg-[#58618E] text-white rounded">
                        Змінити
                    </button>
                </div>
            </div>
        </div>
    );
}