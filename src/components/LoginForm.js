import React, {useState} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import ResetRequestModal from "./ResetRequestModal";
import {FiEye, FiEyeOff} from 'react-icons/fi';

export default function LoginForm({onSuccess, openResetModal}) {
    const [showModalReset, setShowModalReset] = useState(false);
    const {login} = useAuth();
    const [form, setForm] = useState({email: '', password: ''});
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email.trim()) return toast.error("Поле 'E-mail' є обов'язковим.");
        if (!form.password.trim()) return toast.error("Поле 'Пароль' є обов'язковим.");

        try {
            const response = await axios.post('http://localhost:8081/api/auth/login', form);
            login(response.data);
            if (onSuccess) {
                onSuccess();
            }
            navigate('/candidates');
            toast.success('Вхід успішний');
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
                <div className="relative">
                    <label className="block mb-1 text-[#2e2e3a] font-medium">
                        Пароль<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="rounded-xl px-4 py-2 border border-gray-300 w-full"
                        type={showPassword ? 'text' : 'password'}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-9 text-gray-500"
                    >
                        {showPassword ? <FiEyeOff size={20}/> : <FiEye size={20}/>}
                    </button>
                </div>
                <div className="text-sm text-blue-700 underline text-left">

                    <button
                        type="button"
                        onClick={openResetModal}
                        className="underline text-blue-700 hover:text-blue-900"
                    >
                        Забули пароль?
                    </button>
                </div>
                <ResetRequestModal isOpen={showModalReset} onClose={() => setShowModalReset(false)}/>

                <button
                    type="submit"
                    className="mt-2 bg-[#fcb03d] hover:bg-[#e59e30] text-white font-bold py-2 px-6 rounded-2xl shadow-md"
                >
                    Увійти
                </button>
            </form>
            <label className="block mb-1 mt-5 text-[#2e2e3a] font-medium">
                Обов'язкові поля<span className="text-red-500 ml-1">*</span>
            </label>
        </div>
    );
}