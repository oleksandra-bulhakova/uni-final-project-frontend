import React from 'react';
import {useAuth} from '../context/AuthContext';
import {FiUser, FiUsers, FiBriefcase, FiFileText, FiClipboard} from 'react-icons/fi';
import {Link} from "react-router-dom";
import {getUserId} from '../utils/auth';


export default function Sidebar() {
    const {isAuthenticated} = useAuth();
    const userId = getUserId();

    if (!isAuthenticated) return null;

    return (
        <aside className="bg-[#ecebeb] h-screen w-80 p-6 flex flex-col gap-6 shadow-md">

            <Link
                to={`/user/${userId}`}
                className="flex items-center gap-3 bg-[#fcb03d] hover:bg-[#e59e30] text-white font-bold text-xl py-4 px-6 rounded-2xl"
            >
                <FiUser size={28}/> Мій профіль
            </Link>
            <Link
                to={"/users"}
                className="flex items-center gap-3 bg-[#fcb03d] hover:bg-[#e59e30] text-white font-bold text-xl py-4 px-6 rounded-2xl"
            >
                <FiUsers size={28}/> Користувачі
            </Link>
            <button
                className="flex items-center gap-3 bg-[#fcb03d] hover:bg-[#e59e30] text-white font-bold text-xl py-4 px-6 rounded-2xl">
                <FiUsers size={28}/> Кандидати
            </button>
            <Link
                to={"/clients"}
                className="flex items-center gap-3 bg-[#fcb03d] hover:bg-[#e59e30] text-white font-bold text-xl py-4 px-6 rounded-2xl"
            >
                <FiBriefcase size={28}/> Замовники
            </Link>
            <button
                className="flex items-center gap-3 bg-[#fcb03d] hover:bg-[#e59e30] text-white font-bold text-xl py-4 px-6 rounded-2xl">
                <FiFileText size={28}/> Звіти
            </button>
            <Link
                to={"/vacancies"}
                className="flex items-center gap-3 bg-[#fcb03d] hover:bg-[#e59e30] text-white font-bold text-xl py-4 px-6 rounded-2xl"
            >
                <FiClipboard size={28}/> Вакансії
            </Link>
        </aside>
    );
}