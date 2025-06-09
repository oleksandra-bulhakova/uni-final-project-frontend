import React, { useState } from "react";
import Select from "react-select";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const sources = [
    "LINKEDIN", "DOU", "DJINNI", "ROBOTA_UA", "WORK_UA",
    "RECOMMENDATION", "INTERNSHIP", "INTERNAL", "SOCIAL_MEDIA", "OTHER"
];

export default function EditCandidateModal({ candidate, onClose, onSuccess }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        source: candidate.source
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSourceChange = (selected) => {
        setFormData({ ...formData, source: selected.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/candidates/${candidate.id}`, formData);
            onSuccess();
            onClose();
        } catch (err) {
            console.error("Помилка при оновленні кандидата", err);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 text-2xl">&times;</button>
                <h2 className="text-2xl font-bold mb-4 text-center">Редагувати дані</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Ім’я"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Прізвище"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                    <Select
                        value={{ label: formData.source, value: formData.source }}
                        options={sources.map(s => ({ value: s, label: s }))}
                        onChange={handleSourceChange}
                        placeholder="Джерело"
                    />
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() =>
                                toast.custom((t) => (
                                    <div
                                        className={`bg-white p-4 rounded-lg shadow-lg border border-gray-200 text-center w-full max-w-md mx-auto
                        transition-all ${t.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                                        style={{marginTop: "180px"}}
                                    >
                                        <p className="mb-4 text-gray-800 font-medium">
                                            Ви впевнені, що хочете видалити кандидата?
                                        </p>
                                        <div className="flex justify-center gap-4">
                                            <button
                                                onClick={async () => {
                                                    toast.dismiss(t.id);
                                                    try {
                                                        await api.delete(`/candidates/${candidate.id}`);
                                                        toast.success("Кандидата видалено", {duration: 1000});
                                                        navigate("/candidates");
                                                        onSuccess();
                                                        onClose();
                                                    } catch (err) {
                                                        console.error("Помилка при видаленні кандидата", err);
                                                        toast.error("Не вдалося видалити кандидата");
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
                                ), {duration: Infinity})
                            }
                            className="px-4 py-2 border border-red-500 text-red-600 rounded hover:bg-red-50"
                        >
                            Видалити
                        </button>
                        <button type="submit"
                                className="px-4 py-2 bg-[#FE7C7C] text-white rounded hover:bg-[#58618E]">Зберегти
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}