import React from 'react';
import FinishRegistrationForm from "../components/FinishRegistrationForm";


export default function FinishRegistrationPage() {
    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-50">
            <div className="mt-10 rounded-2xl shadow-md w-full max-w-xl bg-white p-6">
            <FinishRegistrationForm/>
            </div>
        </div>
    );
}