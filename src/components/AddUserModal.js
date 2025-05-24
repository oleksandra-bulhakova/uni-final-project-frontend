import React from 'react';
import AddUserForm from './AddUserForm';

export default function AddUserModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
                >
                    &times;
                </button>
                <AddUserForm onSuccess={onClose}/>
            </div>
        </div>
    );
}