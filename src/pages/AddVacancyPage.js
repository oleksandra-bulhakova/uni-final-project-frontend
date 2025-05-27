import React, {useState, useEffect} from "react";
import api from "../api/axiosInstance";
import {getUserId} from "../utils/auth";
import {useNavigate} from "react-router-dom";
import Select from "react-select";

export default function AddVacancyPage() {
    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });
    const [selectedTechnologies, setSelectedTechnologies] = useState([]);
    const [allTechnologies, setAllTechnologies] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [selectedClientId, setSelectedClientId] = useState(null);

    useEffect(() => {
        const fetchTechnologies = async () => {
            try {
                const response = await api.get("/technologies");
                setAllTechnologies(response.data);
            } catch (err) {
                console.error("Не вдалося завантажити технології", err);
            }
        };

        const fetchClients = async () => {
            try {
                const userId = getUserId();
                const response = await api.get("/clients", {
                    headers: {"Current-User-Id": userId}
                });
                setClients(response.data);
            } catch (err) {
                console.error("Не вдалося завантажити замовників", err);
            }
        };

        fetchTechnologies();
        fetchClients();
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };
    const handleClientChange = (e) => {
        setSelectedClientId(Number(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const userId = getUserId();
            const payload = {
                ...formData,
                client: {id: selectedClientId},
                technologies: selectedTechnologies
            };
            await api.post("/vacancies", payload, {
                headers: {
                    "Current-User-Id": userId
                }
            });
            navigate("/vacancies");
        } catch (err) {
            setError("Не вдалося створити вакансію");
            console.error(err);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto min-h-screen p-10">
            <h2 className="text-4xl font-bold text-center mb-10">Додати вакансію</h2>

            <form onSubmit={handleSubmit} className="space-y-6 text-xl">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Назва вакансії</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Опис</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Замовник</label>
                    <select
                        value={selectedClientId || ""}
                        onChange={handleClientChange}
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    >
                        <option value="" disabled>Оберіть замовника</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.id}>
                                {client.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Технології</label>
                    <Select
                        isMulti
                        placeholder="Оберіть технології"
                        options={allTechnologies.map(tech => ({
                            value: tech.id,
                            label: tech.name
                        }))}
                        onChange={(selected) => {
                            const selectedMapped = selected.map(s => ({id: s.value, name: s.label}));
                            setSelectedTechnologies(selectedMapped);
                        }}
                        className="text-black"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-[#FE7C7C] hover:bg-[#58618E] text-white px-6 py-3 rounded"
                >
                    Додати вакансію
                </button>

                {error && <p className="text-red-600">{error}</p>}
            </form>
        </div>
    );
}
