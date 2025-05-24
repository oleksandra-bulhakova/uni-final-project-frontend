import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiUsers, FiBriefcase, FiFileText, FiClipboard } from 'react-icons/fi';
import logo from "../assets/logo.png";
import {Link} from "react-router-dom";


export default function Sidebar() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) return null;

    return (
        <aside className="bg-[#ecebeb] h-screen w-80 p-6 flex flex-col gap-6 shadow-md fixed left-0 top-0">
            <Link to="/">
                <img src={logo} alt="SmartBase Logo" className="h-24"/>
            </Link>

            <button className="mt-8 flex items-center gap-3 bg-[#fcb03d] hover:bg-[#e59e30] text-white font-bold text-xl py-4 px-6 rounded-2xl">
                <FiUser size={28} /> Мій профіль
            </button>
            <button className="flex items-center gap-3 bg-[#fcb03d] hover:bg-[#e59e30] text-white font-bold text-xl py-4 px-6 rounded-2xl">
                <FiUsers size={28} /> Користувачі
            </button>
            <button className="flex items-center gap-3 bg-[#fcb03d] hover:bg-[#e59e30] text-white font-bold text-xl py-4 px-6 rounded-2xl">
                <FiUsers size={28} /> Кандидати
            </button>
            <button className="flex items-center gap-3 bg-[#fcb03d] hover:bg-[#e59e30] text-white font-bold text-xl py-4 px-6 rounded-2xl">
                <FiBriefcase size={28} /> Замовники
            </button>
            <button className="flex items-center gap-3 bg-[#fcb03d] hover:bg-[#e59e30] text-white font-bold text-xl py-4 px-6 rounded-2xl">
                <FiFileText size={28} /> Звіти
            </button>
            <button className="flex items-center gap-3 bg-[#fcb03d] hover:bg-[#e59e30] text-white font-bold text-xl py-4 px-6 rounded-2xl">
                <FiClipboard size={28} /> Вакансії
            </button>
        </aside>
    );
}