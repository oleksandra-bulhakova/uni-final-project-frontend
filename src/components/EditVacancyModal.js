import React, { useState } from "react";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function EditVacancyModal({ vacancyId, currentName, currentDescription, onSuccess }) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(currentName);
    const [description, setDescription] = useState(currentDescription);
    const navigate = useNavigate();

    const handleSave = async () => {
        try {
            await api.put(`/vacancies/${vacancyId}`, {
                name,
                description
            });
            toast.success("Вакансію оновлено");
            onSuccess();
            setIsOpen(false);
        } catch (err) {
            toast.error("Помилка при оновленні вакансії");
            console.error(err);
        }
    };

    const handleDelete = () => {
        toast.custom((t) => (
            <div
                className={`bg-white p-4 rounded-lg shadow-lg border border-gray-200 text-center w-full max-w-md mx-auto transition-all ${t.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ marginTop: "180px" }}
            >
                <p className="mb-4 text-gray-800 font-medium">
                    Ви впевнені, що хочете видалити вакансію?
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try {
                                await api.delete(`/vacancies/${vacancyId}`);
                                toast.success("Вакансію видалено", { duration: 1000 });
                                navigate("/vacancies");
                            } catch (err) {
                                console.error("Помилка при видаленні вакансії", err);
                                toast.error("Не вдалося видалити вакансію");
                            }
                        }}
                        className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Так
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-4 py-1 border rounded hover:bg-gray-100"
                    >
                        Ні
                    </button>
                </div>
            </div>
        ), { duration: Infinity });
    };

    return (
        <div className="inline-block ml-2">
            <FiEdit
                className="text-gray-500 cursor-pointer text-xl hover:text-black"
                onClick={() => setIsOpen(true)}
            />

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                    <div className="relative bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Редагувати вакансію</h2>
                        <form className="space-y-4 text-base">
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Назва</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 font-normal"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Опис</label>
                                <textarea
                                    rows="4"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 resize-none font-normal"
                                />
                            </div>
                            <div className="flex justify-between gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="px-4 py-2 border border-red-500 text-red-600 rounded hover:bg-red-50 font-normal"
                                >
                                    Видалити
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-[#FE7C7C] hover:bg-[#58618E] text-white rounded font-normal"
                                >
                                    Зберегти
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
