import React, { useState } from "react";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

function AddContactModal({ ownerId, ownableType, onClose, onSuccess }) {
    const [contactType, setContactType] = useState("MAIN_EMAIL");
    const [contact, setContact] = useState("");

    const handleSubmit = async () => {
        try {
            await api.post(`/contact/${ownerId}`, {
                contactType,
                contact,
                ownableType
            });
            toast.success("Контакт додано");
            onSuccess();
            onClose();
        } catch (error) {
            toast.error("Помилка при додаванні контакту");
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
                >
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4 text-gray-800">Додати контакт</h2>

                <label className="block text-gray-700 mb-2">Тип контакту</label>
                <select
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                    value={contactType}
                    onChange={(e) => setContactType(e.target.value)}
                >
                    <option value="EMAIL">E-mail</option>
                    <option value="PHONE">Телефон</option>
                    <option value="TELEGRAM">Telegram</option>
                    <option value="VIBER">Viber</option>
                    <option value="WHATSAPP">WhatsApp</option>
                    <option value="LINK">Посилання</option>
                </select>

                <label className="block text-gray-700 mb-2">Контакт</label>
                <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                />

                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-[#FE7C7C] hover:bg-[#58618E] text-white rounded"
                    >
                        Зберегти
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddContactModal;
