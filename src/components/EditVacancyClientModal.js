import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

export default function EditVacancyClientModal({ vacancyId, currentClient, onSuccess }) {
    const [isOpen, setIsOpen] = useState(false);
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(currentClient);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await api.get("/clients");
                setClients(response.data);
            } catch (err) {
                console.error("Не вдалося завантажити клієнтів", err);
            }
        };
        fetchClients();
    }, []);

    const handleSubmit = async () => {
        try {
            await api.put(`/vacancies/client/${vacancyId}/${selectedClient.id}`);
            toast.success("Клієнта змінено");
            onSuccess();
            setIsOpen(false);
        } catch (err) {
            console.error("Помилка при зміні клієнта", err);
            toast.error("Не вдалося змінити клієнта");
        }
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
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Змінити замовника</h2>
                        <div className="space-y-4">
                            <select
                                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 font-normal"
                                value={selectedClient?.id || ""}
                                onChange={(e) => {
                                    const client = clients.find(c => c.id === parseInt(e.target.value));
                                    setSelectedClient(client);
                                }}
                            >
                                {clients.map(client => (
                                    <option key={client.id} value={client.id}>{client.name}</option>
                                ))}
                            </select>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="px-4 py-2 bg-[#FE7C7C] hover:bg-[#58618E] text-white rounded font-normal"
                                >
                                    Зберегти
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
