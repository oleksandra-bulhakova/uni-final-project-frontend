import React, { useState, useEffect } from "react";
import Select from "react-select";
import { toast } from "react-hot-toast";
import api from "../api/axiosInstance";
import { FiX } from "react-icons/fi";
import { DateTime } from "luxon";

const typeOptions = [
    { value: "PRESCREEN", label: "Prescreen" },
    { value: "INTERVIEW", label: "Interview" },
    { value: "ENGLISH_CHECK", label: "English Check" },
    { value: "OFFER", label: "Offer" },
    { value: "HIRING", label: "Hiring" },
];

const statusOptions = [
    { value: "SCHEDULED", label: "Scheduled" },
    { value: "COMPLETED", label: "Completed" },
    { value: "CANCELED", label: "Canceled" },
];

export default function EditAppointmentModal({ appointment, candidateId, onClose, onSuccess }) {
    const [type, setType] = useState(typeOptions.find(opt => opt.value === appointment.type));
    const [status, setStatus] = useState(statusOptions.find(opt => opt.value === appointment.status));
    const [date, setDate] = useState(
        DateTime.fromISO(appointment.date).toLocal().toFormat("yyyy-MM-dd'T'HH:mm")
    );
    const dateWithOffset = DateTime.fromISO(date, { zone: 'Europe/Kyiv' }).toISO();

    const handleSave = async () => {
        try {
            await api.put(`/candidates/appointment/${appointment.id}/${candidateId}/${appointment.vacancyId}`, {
                appointmentType: type.value,
                appointmentStatus: status.value,
                date: dateWithOffset
            });
            toast.success("Подію оновлено");
            onSuccess();
            onClose();
        } catch (err) {
            console.error("Помилка при оновленні події", err);
            toast.error("Не вдалося оновити подію");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
                >
                    <FiX />
                </button>
                <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Редагувати подію</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Тип події</label>
                        <Select
                            value={type}
                            onChange={setType}
                            options={typeOptions}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
                        <Select
                            value={status}
                            onChange={setStatus}
                            options={statusOptions}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Дата та час</label>
                        <input
                            type="datetime-local"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-[#FE7C7C] text-white hover:bg-[#58618E] rounded"
                        >
                            Зберегти
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
