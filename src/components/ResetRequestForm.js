import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function ResetRequestForm({ onSuccess }) {
    const [form, setForm] = useState({
        email: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email} = form;

        if (!email.trim()) return toast.error("Поле 'E-mail' є обов'язковим.");

        try {
            const response = await axios.post(`http://localhost:8081/api/auth/forgot-password?email=${encodeURIComponent(form.email)}`);
            toast.success('Щоб продовжити - перевірте імейл');

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
            <h2 className="text-2xl font-semibold text-[#2e2e3a] mb-6 text-center">Запит на скидання паролю</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block mb-1 text-[#2e2e3a] font-medium">
                        E-mail<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input name="email" value={form.email} onChange={handleChange} className="rounded-xl px-4 py-2 border border-gray-300 w-full" />
                </div>

                <button type="submit" className="mt-4 bg-[#fcb03d] hover:bg-[#e59e30] text-white font-bold py-2 px-6 rounded-2xl shadow-md">
                    Скинути пароль
                </button>
            </form>
            <label className="block mt-6 text-[#2e2e3a] font-medium">
                Обов'язково для заповнення<span className="text-red-500 ml-1">*</span>
            </label>
        </div>
    );
}
