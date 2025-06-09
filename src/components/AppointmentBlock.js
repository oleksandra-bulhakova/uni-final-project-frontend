import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import AppointmentModal from "./AppointmentModal";

export default function AppointmentBlock({ candidateId }) {
    const [appointments, setAppointments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const appointmentsPerPage = 5;

    const appointmentTypeOptions = [
        { value: "PRESCREEN", label: "Prescreen" },
        { value: "INTERVIEW", label: "Interview" },
        { value: "ENGLISH_CHECK", label: "English Check" },
        { value: "OFFER", label: "Offer" },
        { value: "HIRING", label: "Hiring" },
    ];

    useEffect(() => {
        fetchAppointments();
    }, [candidateId]);

    const fetchAppointments = async () => {
        try {
            const response = await api.get(`/candidates/appointment/${candidateId}`);
            setAppointments(response.data);
        } catch (error) {
            console.error("Не вдалося завантажити події:", error);
        }
    };

    const indexOfLast = currentPage * appointmentsPerPage;
    const indexOfFirst = indexOfLast - appointmentsPerPage;
    const currentAppointments = appointments.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(appointments.length / appointmentsPerPage);

    return (
        <div className="bg-gray-100 rounded-lg p-4 shadow text-xl">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Події</h3>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#FE7C7C] hover:bg-[#58618E] text-white px-4 py-2 rounded"
                >
                    Додати
                </button>
            </div>

            <div className="space-y-3">
                {currentAppointments.map((appt) => (
                    <div key={appt.id} className="border p-3 rounded bg-white shadow-sm">
                        <p className="font-semibold">
                            {
                                appointmentTypeOptions.find(opt => opt.value === appt.type)?.label || appt.type
                            }
                        </p>
                        <p className="text-gray-600 text-base">{new Date(appt.date).toLocaleString('uk-UA', {timeZone: 'Europe/Kyiv' })}</p>
                        <p className="text-gray-600 text-base">Вакансія: {appt.vacancyName}</p>
                        <p className="text-gray-600 text-base">Рекрутер: {appt.user.firstName} {appt.user.lastName}</p>
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded ${
                            currentPage === i + 1
                                ? "bg-gray-800 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {isModalOpen && (
                <AppointmentModal
                    candidateId={candidateId}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={fetchAppointments}
                />
            )}
        </div>
    );
}
