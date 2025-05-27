import React, {useState} from 'react';
import api from '../api/axiosInstance';
import {getUserId} from '../utils/auth';
import ContactList from '../components/ContactList';
import AddressBlock from '../components/AddressBlock';
import VacancyList from '../components/VacancyList';

export default function AddClientPage() {
    const [formData, setFormData] = useState({name: '', email: ''});
    const [client, setClient] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const userId = getUserId();
            const response = await api.post('/clients', formData, {
                headers: {
                    'Current-User-Id': userId
                }
            });
            setClient(response.data);
        } catch (err) {
            setError('Не вдалося створити замовника');
            console.error(err);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto min-h-screen p-10">
            <h2 className="text-3xl font-bold text-center mb-10">Додати замовника</h2>

            {!client ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block font-medium text-gray-700 text-xl">Назва</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700 text-xl">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#FE7C7C] hover:bg-[#58618E] text-white font-semibold px-6 py-2 rounded text-xl"
                    >
                        Додати
                    </button>
                    {error && <p className="text-red-500">{error}</p>}
                </form>
            ) : (
                <div className="space-y-8">
                    <div>
                        <p><strong>Назва:</strong> {client.name}</p>
                        <p><strong>Дата реєстрації:</strong> {client.registrationDate}</p>
                    </div>
                    <ContactList contacts={client.contacts}/>
                    <AddressBlock address={client.address}/>
                    <VacancyList vacancies={client.vacancies}/>
                </div>
            )}
        </div>
    );
}