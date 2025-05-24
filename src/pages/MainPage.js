import React from "react";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../utils/auth';

export default function MainPage() {
    const role = getUserRole();

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);
    return (
        <div className="flex flex-col items-center w-full max-w-xl px-4">

        </div>
    );
}