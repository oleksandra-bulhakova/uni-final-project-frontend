import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from '../api/axiosInstance';

function CreateCandidatePage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        source: "",
        email: "",
        phone: "",
        link: ""
    });

    const sources = [
        "LINKEDIN",
        "DOU",
        "DJINNI",
        "ROBOTA_UA",
        "WORK_UA",
        "RECOMMENDATION",
        "INTERNSHIP",
        "INTERNAL",
        "SOCIAL_MEDIA",
        "OTHER"
    ];

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            registrationDate: new Date().toISOString().split("T")[0]
        };

        try {
            const response = await api.post("/candidates", payload, {
                headers: {Accept: "application/json"}
            });
            console.log("Кандидат створений:", response.data);
            navigate("/candidates");
        } catch (error) {
            console.error("Помилка при створенні кандидата:", error);
        }
    };

    return (
        <div className="p-6">
            <div>
                <h2 className="text-3xl font-bold text-center mb-10">Додати кандидата</h2>
            </div>

            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
                <div>
                    <label className="block font-medium text-gray-700 text-xl mb-1">Ім'я</label>
                    <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700 text-xl mb-1">Прізвище</label>
                    <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700 text-xl mb-1">Джерело</label>
                    <select
                        name="source"
                        value={formData.source}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Оберіть джерело</option>
                        {sources.map((src) => (
                            <option key={src} value={src}>
                                {src}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block font-medium text-gray-700 text-xl mb-1">E-mail</label>
                    <input
                        name="email"
                        placeholder="Email (необов'язково)"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700 text-xl mb-1">Телефон</label>
                    <input
                        name="phone"
                        placeholder="Телефон (необов'язково)"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700 text-xl mb-1">Посилання</label>
                    <input
                        name="link"
                        placeholder="Посилання (LinkedIn тощо)"
                        value={formData.link}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-[#FE7C7C] hover:bg-[#58618E] text-white font-semibold px-6 py-2 rounded text-xl"
                >
                    Додати
                </button>
            </form>
        </div>
    );
}

export default CreateCandidatePage;