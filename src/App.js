import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';

export default function App() {
    return (
        <div className="min-h-screen bg-[#f6f6f6] flex flex-col items-center justify-center">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<CompanyRegistration />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
            <ToastContainer />
        </div>
    );
}

function Home() {
    return (
        <div className="flex flex-col items-center w-full max-w-xl px-4">
            <h1 className="text-3xl font-semibold text-[#2e2e3a] mb-8">SmartBase</h1>
            <Link to="/register" className="w-full max-w-md">
                <button
                    className="w-full bg-[#fcb03d] hover:bg-[#e59e30] text-white font-bold py-2 px-6 rounded-2xl shadow-md">
                    Зареєструвати компанію
                </button>
            </Link>
        </div>
    );
}

function CompanyRegistration() {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            firstName,
            lastName,
            email,
            companyName,
            phone,
            password,
            confirmPassword
        } = form;

        if (!firstName.trim()) return toast.error("Поле 'Ім'я' є обов'язковим.");
        if (!lastName.trim()) return toast.error("Поле 'Прізвище' є обов'язковим.");
        if (!email.trim()) return toast.error("Поле 'E-mail' є обов'язковим.");
        if (!companyName.trim()) return toast.error("Поле 'Назва компанії' є обов'язковим.");
        if (!phone.trim()) return toast.error("Поле 'Номер телефону' є обов'язковим.");
        if (!password) return toast.error("Введіть пароль.");
        if (!confirmPassword) return toast.error("Повторіть пароль.");
        if (password !== confirmPassword) return toast.error("Паролі не співпадають.");


        try {
            const response = await axios.post('http://localhost:8081/api/auth/register', form);
            toast.success('Компанію зареєстровано!');
            console.log(response.data);
        } catch (error) {
            toast.error('Щось пішло не так 😬');
            console.error(error);
        }
    };

    return (
        <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-xl">
            <h2 className="text-2xl font-semibold text-[#2e2e3a] mb-6 text-center">Реєстрація компанії</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block mb-1 text-[#2e2e3a] font-medium">
                        Ім'я<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input name="firstName" value={form.firstName} onChange={handleChange}
                           className="rounded-xl px-4 py-2 border border-gray-300 w-full"/>
                </div>

                <div>
                    <label className="block mb-1 text-[#2e2e3a] font-medium">
                        Прізвище<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input name="lastName" value={form.lastName} onChange={handleChange}
                           className="rounded-xl px-4 py-2 border border-gray-300 w-full"/>
                </div>

                <div>
                    <label className="block mb-1 text-[#2e2e3a] font-medium">
                        E-mail<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input name="email" value={form.email} onChange={handleChange}
                           className="rounded-xl px-4 py-2 border border-gray-300 w-full" type="email"/>
                </div>

                <div>
                    <label className="block mb-1 text-[#2e2e3a] font-medium">
                        Назва компанії<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input name="companyName" value={form.companyName} onChange={handleChange}
                           className="rounded-xl px-4 py-2 border border-gray-300 w-full"/>
                </div>

                <div>
                    <label className="block mb-1 text-[#2e2e3a] font-medium">
                        Номер телефону<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input name="phone" value={form.phone} onChange={handleChange}
                           className="rounded-xl px-4 py-2 border border-gray-300 w-full"/>
                </div>

                <div className="flex gap-2">
                    <div className="w-full">
                        <label className="block mb-1 text-[#2e2e3a] font-medium">
                            Пароль<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input name="password" value={form.password} onChange={handleChange}
                               className="rounded-xl px-4 py-2 border border-gray-300 w-full" type="password"/>
                    </div>
                    <div className="w-full">
                        <label className="block mb-1 text-[#2e2e3a] font-medium">
                            Повторіть пароль<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
                               className="rounded-xl px-4 py-2 border border-gray-300 w-full" type="password"/>
                    </div>
                </div>

                <button type="submit"
                        className="mt-4 bg-[#fcb03d] hover:bg-[#e59e30] text-white font-bold py-2 px-6 rounded-2xl shadow-md">
                    Створити акаунт
                </button>
            </form>
            <label className="block mb-1 text-[#2e2e3a] font-medium">
                Обов'язкові поля<span className="text-red-500 ml-1">*</span>
            </label>
        </div>
    );
}