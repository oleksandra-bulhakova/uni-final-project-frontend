import React, { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api/axiosInstance";
import { toast } from "react-toastify";

const appointmentTypeOptions = [
    { value: "PRESCREEN", label: "Prescreen" },
    { value: "INTERVIEW", label: "Interview" },
    { value: "ENGLISH_CHECK", label: "English Check" },
    { value: "OFFER", label: "Offer" },
    { value: "HIRING", label: "Hiring" },
];

export default function AppointmentModal({ onClose, candidateId, onSuccess }) {
    const [appointmentType, setAppointmentType] = useState(null);
    const [vacancyOptions, setVacancyOptions] = useState([]);
    const [selectedVacancy, setSelectedVacancy] = useState(null);
    const [date, setDate] = useState(null);

    useEffect(() => {
        const fetchVacancies = async () => {
            try {
                const response = await api.get(`/vacancies/candidate/${candidateId}`);
                const options = response.data.map(v => ({
                    value: v.id,
                    label: v.name
                }));
                setVacancyOptions(options);
            } catch (error) {
                console.error("Не вдалося завантажити вакансії:", error);
            }
        };
        fetchVacancies();
    }, []);

    const handleAddAppointment = async () => {
        if (!appointmentType || !date || !selectedVacancy) {
            toast.error("Будь ласка, заповніть усі поля");
            return;
        }
        try {
            await api.put(`/candidates/appointment/${candidateId}/${selectedVacancy.value}`, {
                appointmentType: appointmentType.value,
                date
            });
            toast.success("Зустріч додано");
            setAppointmentType(null);
            setSelectedVacancy(null);
            setDate(null);
            onSuccess();
            onClose();
        } catch (err) {
            console.error("Помилка при додаванні зустрічі:", err);
            toast.error("Не вдалося додати зустріч");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg text-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
                >
                    ×
                </button>
                <h2 className="text-2xl font-bold mb-4">Додати подію</h2>
                <div className="space-y-4">
                    <Select
                        options={appointmentTypeOptions}
                        value={appointmentType}
                        onChange={setAppointmentType}
                        placeholder="Оберіть тип зустрічі"
                    />
                    <Select
                        options={vacancyOptions}
                        value={selectedVacancy}
                        onChange={setSelectedVacancy}
                        placeholder="Оберіть вакансію"
                    />
                    <DatePicker
                        selected={date}
                        onChange={setDate}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="yyyy-MM-dd HH:mm"
                        placeholderText="Оберіть дату і час"
                        className="w-full px-4 py-2 border rounded"
                    />
                    <div className="flex justify-end gap-4">
                        <button
                            onClick={handleAddAppointment}
                            className="px-4 py-2 bg-[#FE7C7C] text-white rounded hover:bg-[#58618E]"
                        >
                            Зберегти
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}