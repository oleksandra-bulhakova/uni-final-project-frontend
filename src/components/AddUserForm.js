import React, { useState } from 'react';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';

export default function AddUserForm({ onSuccess }) {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { firstName, lastName, email, role } = form;

        if (!firstName.trim()) return toast.error("Поле 'Ім'я' є обов'язковим.");
        if (!lastName.trim()) return toast.error("Поле 'Прізвище' є обов'язковим.");
        if (!email.trim()) return toast.error("Поле 'E-mail' є обов'язковим.");
        if (!role) return toast.error("Оберіть роль користувача.");

        try {
            const response = await api.post('/auth/invite', form);
            toast.success('Запрошення надіслано');
            console.log(response.data);

            if (onSuccess) {
                onSuccess();
            }

        } catch (error) {
            toast.error('Щось пішло не так 😬');
            console.error(error);
        }
    };

    return (
        <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-xl">
            <h2 className="text-2xl font-semibold text-[#2e2e3a] mb-6 text-center">Додати користувача</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block mb-1 text-[#2e2e3a] font-medium">
                        Ім'я<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input name="firstName" value={form.firstName} onChange={handleChange} className="rounded-xl px-4 py-2 border border-gray-300 w-full" />
                </div>

                <div>
                    <label className="block mb-1 text-[#2e2e3a] font-medium">
                        Прізвище<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input name="lastName" value={form.lastName} onChange={handleChange} className="rounded-xl px-4 py-2 border border-gray-300 w-full" />
                </div>

                <div>
                    <label className="block mb-1 text-[#2e2e3a] font-medium">
                        E-mail<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input name="email" value={form.email} onChange={handleChange} type="email" className="rounded-xl px-4 py-2 border border-gray-300 w-full" />
                </div>

                <div>
                    <label className="block mb-1 text-[#2e2e3a] font-medium">
                        Роль<span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="flex gap-4 mt-2">
                        <label className="flex items-center gap-2">
                            <input type="radio" name="role" value="RECRUITER" onChange={handleChange} checked={form.role === 'RECRUITER'} />
                            Рекрутер
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="radio" name="role" value="HIRING_MANAGER" onChange={handleChange} checked={form.role === 'HIRING_MANAGER'} />
                            Hiring manager
                        </label>
                    </div>
                </div>

                <button type="submit" className="mt-4 bg-[#fcb03d] hover:bg-[#e59e30] text-white font-bold py-2 px-6 rounded-2xl shadow-md">
                    Надіслати запрошення
                </button>
            </form>
            <label className="block mt-6 text-[#2e2e3a] font-medium">
                Поля обов'язкові для заповнення<span className="text-red-500 ml-1">*</span>
            </label>
        </div>
    );
}
