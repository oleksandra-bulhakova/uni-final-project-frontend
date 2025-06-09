import React, { useState, useEffect } from "react";
import Select from "react-select";
import toast from "react-hot-toast";
import api from "../api/axiosInstance";

export default function AddCandidateToVacancyModal({ candidateId, onClose, onSuccess }) {
    const [vacancies, setVacancies] = useState([]);
    const [selectedVacancy, setSelectedVacancy] = useState(null);

    useEffect(() => {
        const fetchVacancies = async () => {
            try {
                const response = await api.get("/vacancies");
                const options = response.data.map(vacancy => ({
                    value: vacancy.id,
                    label: vacancy.name
                }));
                setVacancies(options);
            } catch (error) {
                console.error("Не вдалося отримати вакансії:", error);
                toast.error("Помилка при завантаженні вакансій");
            }
        };

        fetchVacancies();
    }, []);

    const handleAddToVacancy = async () => {
        if (!selectedVacancy) {
            toast.error("Оберіть вакансію");
            return;
        }

        try {
            await api.put(`/candidates/${candidateId}/${selectedVacancy.value}`);
            console.log(selectedVacancy.value)
            toast.success("Кандидата додано до вакансії");
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Помилка при додаванні кандидата:", error);
            console.log(selectedVacancy.value)
            toast.error("Не вдалося додати кандидата до вакансії");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 text-2xl">&times;</button>
                <h2 className="text-2xl font-bold mb-4 text-center">Додати до вакансії</h2>

                <Select
                    options={vacancies}
                    value={selectedVacancy}
                    onChange={setSelectedVacancy}
                    placeholder="Оберіть вакансію"
                    className="mb-4"
                />

                <div className="flex justify-end">
                    <button
                        onClick={handleAddToVacancy}
                        className="px-4 py-2 bg-[#FE7C7C] hover:bg-[#58618E] text-white rounded"
                    >
                        Додати
                    </button>
                </div>
            </div>
        </div>
    );
}
