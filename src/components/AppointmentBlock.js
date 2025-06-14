import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import AppointmentModal from "./AppointmentModal";
import {FiEdit, FiTrash2} from "react-icons/fi";
import EditAppointmentModal from "./EditAppointmentModal";
import toast from "react-hot-toast";

export default function AppointmentBlock({ candidateId, onAppointmentChange }) {
    const [appointments, setAppointments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const appointmentsPerPage = 5;
    const [editingAppointment, setEditingAppointment] = useState(null);

    const appointmentTypeOptions = [
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
                    <div key={appt.id} className="border p-3 rounded bg-white shadow-sm relative">
                        <button
                            onClick={() => setEditingAppointment(appt)}
                            className="absolute top-2 right-10 text-gray-500 hover:text-black"
                            title="Редагувати подію"
                        >
                            <FiEdit/>
                        </button>
                        <button
                            onClick={() =>
                                toast.custom((t) => (
                                    <div
                                        className={`bg-white p-4 rounded-lg shadow-lg border border-gray-200 text-center w-full max-w-md mx-auto transition-all ${
                                            t.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                                        }`}
                                        style={{marginTop: "180px"}}
                                    >
                                        <p className="mb-4 text-gray-800 font-medium">
                                            Ви впевнені, що хочете видалити подію?
                                        </p>
                                        <div className="flex justify-center gap-4">
                                            <button
                                                onClick={async () => {
                                                    toast.dismiss(t.id);
                                                    try {
                                                        await api.delete(`/candidates/appointment/${appt.id}/${candidateId}`);
                                                        toast.success("Подію видалено", {duration: 1000});
                                                        await fetchAppointments();
                                                        onAppointmentChange?.();
                                                    } catch (err) {
                                                        console.error("Помилка при видаленні події", err);
                                                        toast.error("Не вдалося видалити подію");
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
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                            title="Видалити подію"
                        >
                            <FiTrash2/>
                        </button>
                        <p className="font-semibold">
                            {
                                appointmentTypeOptions.find(opt => opt.value === appt.type)?.label || appt.type
                            }
                        </p>
                        <p className="text-gray-600 text-base">{new Date(appt.date).toLocaleString('uk-UA', {timeZone: 'Europe/Kyiv'})}</p>
                        <p className="text-gray-600 text-base">Вакансія: {appt.vacancyName}</p>
                        <p className="text-gray-600 text-base">Рекрутер: {appt.user.firstName} {appt.user.lastName}</p>
                        <p className="text-gray-600 text-base font-semibold">Статус: {statusOptions.find(opt => opt.value === appt.status)?.label || appt.status}</p>
                    </div>
                ))}
                {editingAppointment && (
                    <EditAppointmentModal
                        appointment={editingAppointment}
                        candidateId={candidateId}
                        onClose={() => setEditingAppointment(null)}
                        onSuccess={() => {
                            fetchAppointments();
                            onAppointmentChange?.();
                        }}
                    />
                )}
            </div>

            <div className="flex justify-center gap-2 mt-4">
                {Array.from({length: totalPages}, (_, i) => (
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
