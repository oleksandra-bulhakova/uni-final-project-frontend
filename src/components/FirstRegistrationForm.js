import React, {useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";
import {FiEye, FiEyeOff} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function CompanyRegistration({ onSuccess }) {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            toast.success('Компанію зареєстровано. Перевірте пошту');
            if (onSuccess) onSuccess();
            navigate("/");
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
                    <div className="relative w-full">
                        <label className="block mb-1 text-[#2e2e3a] font-medium">
                            Пароль<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input name="password" value={form.password} onChange={handleChange}
                               className="rounded-xl px-4 py-2 border border-gray-300 w-full"
                               type={showPassword ? 'text' : 'password'}/>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-gray-500"
                        >
                            {showPassword ? <FiEyeOff size={20}/> : <FiEye size={20}/>}
                        </button>
                    </div>
                    <div className="relative w-full">
                        <label className="block mb-1 text-[#2e2e3a] font-medium">
                            Повторіть пароль<span className="text-red-500 ml-1">*</span>
                        </label>
                        <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
                               className="rounded-xl px-4 py-2 border border-gray-300 w-full"
                               type={showConfirmPassword ? 'text' : 'password'}/>

                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-9 text-gray-500"
                        >
                            {showConfirmPassword ? <FiEyeOff size={20}/> : <FiEye size={20}/>}
                        </button>
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
    )
        ;
}