import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function LoginForm() {
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email.trim()) return toast.error("Поле 'E-mail' є обов'язковим.");
        if (!form.password.trim()) return toast.error("Поле 'Пароль' є обов'язковим.");

        try {
            const response = await axios.post('http://localhost:8081/api/auth/login', form);
            toast.success('Вхід успішний!');
            console.log('TOKEN:', response.data);
            // localStorage.setItem('token', response.data);
        } catch (error) {
            toast.error('Невірний email або пароль 😬');
            console.error(error);
        }
    };

    return (
        <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-xl">
            <h2 className="text-2xl font-semibold text-[#2e2e3a] mb-6 text-center">Вхід у систему</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block mb-1 text-[#2e2e3a] font-medium">
                        E-mail<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="rounded-xl px-4 py-2 border border-gray-300 w-full"
                        type="email"
                    />
                </div>
                <div>
                    <label className="block mb-1 text-[#2e2e3a] font-medium">
                        Пароль<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="rounded-xl px-4 py-2 border border-gray-300 w-full"
                        type="password"
                    />
                </div>
                <div className="text-sm text-blue-700 underline text-left">
                    <Link to="/forgot-password">Забули пароль?</Link>
                </div>
                <button
                    type="submit"
                    className="mt-2 bg-[#fcb03d] hover:bg-[#e59e30] text-white font-bold py-2 px-6 rounded-2xl shadow-md"
                >
                    Увійти
                </button>
            </form>
            <div className="text-sm text-center mt-4 text-blue-700 underline">
                <Link to="/register">Немає акаунту? Зареєструватися</Link>
            </div>
            <div className="mt-4 text-sm text-[#2e2e3a] text-center">
                <span className="text-red-500">*</span> Поля обов’язкові для заповнення
            </div>
        </div>
    );
}