import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import api from "../api/axiosInstance";

const VacancyDetailsPage = () => {
    const {vacancyId} = useParams();
    const [vacancy, setVacancy] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/vacancies/${vacancyId}`)
            .then(response => {
                setVacancy(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Помилка при завантаженні вакансії:', error);
                setLoading(false);
            });
    }, [vacancyId]);

    if (loading) {
        return <div className="text-center mt-10">Завантаження...</div>;
    }

    if (!vacancy) {
        return <div className="text-center mt-10 text-red-600">Вакансію не знайдено.</div>;
    }

    const statusMap = {
        "IN_PROGRESS": {label: "В роботі", color: "bg-blue-100 text-green-800"},
        "CLOSED_WON": {label: "Закрита: виграна", color: "bg-green-100 text-blue-800"},
        "CLOSED_LOST": {label: "Закрита: програна", color: "bg-red-100 text-red-800"},
        "CLOSED_BY_CLIENT": {label: "Закрита клієнтом", color: "bg-orange-100 text-yellow-800"},
    };

    const statusInfo = statusMap[vacancy.status] || {label: vacancy.status, color: "bg-gray-100 text-gray-800"};


    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-4">{vacancy.name}</h1>

            <p className="text-gray-600 mb-2"><strong>Дата створення:</strong> {vacancy.creationDate}</p>
            <p className="text-gray-600 mb-4"><strong>Статус:</strong>
                <span
                    className={`ml-2 inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusInfo.color}`}>
            {statusInfo.label}
        </span>
            </p>

            <div className="mb-4">
                <h2 className="font-semibold">Опис:</h2>
                <p className="text-gray-700">{vacancy.description || '—'}</p>
            </div>

            <div className="mb-4">
                <h2 className="font-semibold">Технології:</h2>
                <ul className="list-disc list-inside text-gray-700">
                    {vacancy.technologies?.length ? (
                        vacancy.technologies.map((tech) => (
                            <li key={tech.id}>{tech.name}</li>
                        ))
                    ) : (
                        <li>—</li>
                    )}
                </ul>
            </div>

            <div className="mb-4">
                <h2 className="font-semibold">Клієнт:</h2>
                <p className="text-gray-700">{vacancy.client?.name || '—'}</p>
            </div>

            <div className="mb-4">
                <h2 className="font-semibold">Рекрутери:</h2>
                <div className="flex flex-wrap gap-3">
                    {vacancy.users?.length ? (
                        vacancy.users.map(user => (
                            <div key={user.id} className="flex items-center gap-2 bg-gray-100 p-2 rounded">
                                {user.imagePath && (
                                    <img
                                        src={user.imagePath}
                                        alt={`${user.firstName} ${user.lastName}`}
                                        className="w-8 h-8 rounded-full"
                                    />
                                )}
                                <span>{user.firstName} {user.lastName}</span>
                            </div>
                        ))
                    ) : (
                        <span>—</span>
                    )}
                </div>
            </div>

            <div>
                <h2 className="font-semibold">Статистика кандидатів:</h2>
                <ul className="list-disc list-inside text-gray-700">
                    {vacancy.candidateStatistics?.length ? (
                        vacancy.candidateStatistics.map((item, index) => (
                            <li key={index}>
                                {item.name}: {item.count}
                            </li>
                        ))
                    ) : (
                        <li>—</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default VacancyDetailsPage;