import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import api from "../api/axiosInstance";
import ClientAddressBlock from "../components/ClientAddressBlock";
import ContactList from "../components/ContactList";
import { FiX } from "react-icons/fi";
import toast from "react-hot-toast";

const ClientDetailsPage = () => {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const vacanciesPerPage = 5;

    const typeLabels = {
        MAIN_EMAIL: "Основний e-mail",
        PHONE: "Телефон",
        EMAIL: "Додатковий e-mail",
        TELEGRAM: "Telegram",
        VIBER: "Viber",
        LINK: "Посилання",
        WHATSAPP: "WhatsApp",
    };

    const fetchClient = () => {
        api.get(`/clients/${clientId}`)
            .then(response => {
                setClient(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Помилка при завантаженні клієнта:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        api.get(`/clients/${clientId}`)
            .then(response => {
                setClient(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Помилка при завантаженні клієнта:", error);
                setLoading(false);
            });
    }, [clientId]);

    if (loading) {
        return <div className="text-center mt-10">Завантаження...</div>;
    }

    if (!client) {
        return <div className="text-center mt-10 text-red-600">Клієнта не знайдено.</div>;
    }

    const handleDelete = () => {
        toast.custom((t) => (
            <div
                className={`bg-white p-4 rounded-lg shadow-lg border border-gray-200 text-center w-full max-w-md mx-auto
                        transition-all ${t.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ marginTop: "180px" }}
            >
                <p className="mb-4 text-gray-800 font-medium">
                    Ви впевнені, що хочете видалити клієнта?
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try {
                                await api.delete(`/clients/${clientId}`);
                                toast.success("Клієнта видалено", { duration: 1000 });
                                navigate("/clients");
                            } catch (err) {
                                console.error("Помилка при видаленні клієнта", err);
                                toast.error("Не вдалося видалити клієнта");
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

    const totalVacancies = client.vacancies?.length || 0;
    const totalPages = Math.ceil(totalVacancies / vacanciesPerPage);
    const indexOfLast = currentPage * vacanciesPerPage;
    const indexOfFirst = indexOfLast - vacanciesPerPage;
    const currentVacancies = client.vacancies?.slice(indexOfFirst, indexOfLast) || [];

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <div className="flex items-center gap-6 mb-4">
                <h1 className="text-2xl font-bold">{client.name}</h1>
                <FiX
                    onClick={handleDelete}
                    className="text-gray-500 hover:text-red-600 cursor-pointer text-2xl"
                    title="Видалити клієнта"
                />
            </div>

            <p className="text-gray-600 mb-2 text-xl">
                <strong>Дата реєстрації:</strong> {client.registrationDate}
            </p>
            <div className="bg-gray-200 rounded-xl p-4 shadow-sm mb-4">
                <ClientAddressBlock address={client.address} ownerId={clientId} onAddressAdded={fetchClient}/>
            </div>
            <div className="bg-gray-200 rounded-xl p-4 shadow-sm mb-4">
                <ContactList
                    contacts={client.contacts}
                    ownerId={clientId}
                    ownableType="CLIENT"
                    onContactAdded={fetchClient}
                />
            </div>

            <div className="bg-gray-200 rounded-xl p-4 shadow-sm mb-4">
                <h2 className="font-semibold text-xl text-gray-700">Вакансії:</h2>
                {currentVacancies.length ? (
                    <>
                        <ul className="list-disc list-inside text-gray-700 mb-2">
                            {currentVacancies.map(vacancy => (
                                <li key={vacancy.id}>
                                    <a
                                        href={`/vacancies/${vacancy.id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {vacancy.name}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="flex justify-center gap-2 text-gray-700">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                            >
                                Назад
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-1 rounded ${
                                        currentPage === i + 1
                                            ? "bg-gray-800 text-white"
                                            : "bg-gray-200"
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                            >
                                Вперед
                            </button>
                        </div>
                    </>
                ) : (
                    <p>—</p>
                )}
            </div>
        </div>
    );
};

export default ClientDetailsPage;