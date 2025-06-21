import React from 'react';
import ChangePasswordForm from "../components/ChangePasswordForm";


export default function ChangePasswordPage() {
    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-50">
            <div className="mt-10 rounded-2xl shadow-md w-full max-w-xl bg-white p-6">
                <ChangePasswordForm/>
            </div>
        </div>
    );
}