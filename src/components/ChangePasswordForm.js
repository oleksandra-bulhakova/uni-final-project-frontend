import React, {useState} from 'react';
import {toast} from 'react-toastify';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {FiEye, FiEyeOff} from 'react-icons/fi';

export default function ChangePasswordForm() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {email, password, confirmPassword} = form;

        if (!email.trim()) return toast.error("Поле 'Імейл' є обов'язковим.");
        if (!password.trim()) return toast.error("Поле 'Пароль' є обов'язковим.");
        if (!confirmPassword.trim()) return toast.error("Поле 'Повторіть пароль' є обов'язковим.");

        try {
            const response = await axios.post('http://localhost:8081/api/auth/set-password', form);
            toast.success('Новий пароль встановлено');
            setTimeout(() => navigate('/'), 1500);
        } catch (error) {
            toast.error('Щось пішло не так 😬');
            console.error(error);
        }
    };

    return (
        <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-xl">
            <h2 className="text-2xl font-semibold text-[#2e2e3a] mb-6 text-center">Встановити новий пароль</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                <div>
                    <label className="block mb-1 text-[#2e2e3a] font-medium">
                        E-mail<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input name="email" value={form.email} onChange={handleChange}
                           className="rounded-xl px-4 py-2 border border-gray-300 w-full"/>
                </div>

                <div className="relative">
                    <label className="block mb-1 text-[#2e2e3a] font-medium">
                        Пароль<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="rounded-xl px-4 py-2 border border-gray-300 w-full pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-9 text-gray-500"
                    >
                        {showPassword ? <FiEyeOff size={20}/> : <FiEye size={20}/>}
                    </button>
                </div>

                <div className="relative">
                    <label className="block mb-1 text-[#2e2e3a] font-medium">
                        Повторіть пароль<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword"
                           value={form.confirmPassword} onChange={handleChange}
                           className="rounded-xl px-4 py-2 border border-gray-300 w-full"/>
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-9 text-gray-500"
                    >
                        {showConfirmPassword ? <FiEyeOff size={20}/> : <FiEye size={20}/>}
                    </button>
                </div>

                <button type="submit"
                        className="mt-4 bg-[#fcb03d] hover:bg-[#e59e30] text-white font-bold py-2 px-6 rounded-2xl shadow-md">
                    Зберігти зміни
                </button>
            </form>
            <label className="block mt-6 text-[#2e2e3a] font-medium">
                Поля обов'язкові для заповнення<span className="text-red-500 ml-1">*</span>
            </label>
        </div>
    );
}
