import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import api from '../api/axiosInstance';
import toast from 'react-hot-toast';

const statusOptions = [
    { value: 'IN_PROGRESS', label: 'В роботі' },
    { value: 'CLOSED_WON', label: 'Закрита: виграна' },
    { value: 'CLOSED_LOST', label: 'Закрита: програна' },
    { value: 'CLOSED_BY_CLIENT', label: 'Закрита клієнтом' },
];

const EditVacancyStatusModal = ({ vacancyId, currentStatus, onStatusChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(currentStatus);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await api.put(`/vacancies/status/${vacancyId}?vacancyStatus=${selectedStatus}`);
            onStatusChange(response.data.status);
            toast.success("Статус вакансії оновлено");
            setIsOpen(false);
        } catch (error) {
            toast.error("Помилка при оновленні статусу вакансії");
            console.error('Помилка при оновленні статусу:', error);
        } finally {
            setLoading(false);
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
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Змінити статус вакансії</h2>
                        <select
                            className="w-full p-2 border rounded mb-6 text-gray-700"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            {statusOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="px-4 py-2 bg-[#FE7C7C] hover:bg-[#58618E] text-white rounded"
                            >
                                Змінити
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditVacancyStatusModal;