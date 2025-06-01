import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosInstance";
import ClientAddressBlock from "../components/ClientAddressBlock";

const ClientDetailsPage = () => {
    const { clientId } = useParams();
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

    const totalVacancies = client.vacancies?.length || 0;
    const totalPages = Math.ceil(totalVacancies / vacanciesPerPage);
    const indexOfLast = currentPage * vacanciesPerPage;
    const indexOfFirst = indexOfLast - vacanciesPerPage;
    const currentVacancies = client.vacancies?.slice(indexOfFirst, indexOfLast) || [];

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-4">{client.name}</h1>

            <p className="text-gray-600 mb-2">
                <strong>Дата реєстрації:</strong> {client.registrationDate}
            </p>

            <ClientAddressBlock address={client.address} clientId={clientId} onAddressAdded={fetchClient}/>

            <div className="mb-4">
                <h2 className="font-semibold">Контакти:</h2>
                {client.contacts?.length ? (
                    <ul className="list-disc list-inside text-gray-700">
                        {client.contacts.map(contact => (
                            <li key={contact.id}>
                                <span className="text-gray-800 font-semibold">
                                    {typeLabels[contact.type] || contact.type}:
                                </span>{" "}
                                <span className="text-gray-500">{contact.contact}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>—</p>
                )}
            </div>

            <div className="mb-4">
                <h2 className="font-semibold">Вакансії:</h2>
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

                        <div className="flex justify-center gap-2 text-sm text-gray-700">
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