import React, { useEffect, useState } from "react";
import Select from "react-select";
import api from "../api/axiosInstance";

const EditVacancyTechnologiesBlock = ({ vacancyId, initialTechnologies, onUpdated }) => {
    const [allTechnologies, setAllTechnologies] = useState([]);
    const [selectedTechnologies, setSelectedTechnologies] = useState(initialTechnologies || []);

    useEffect(() => {
        const fetchTechnologies = async () => {
            try {
                const response = await api.get("/technologies");
                setAllTechnologies(response.data);
            } catch (err) {
                console.error("Не вдалося завантажити технології", err);
            }
        };
        fetchTechnologies();
    }, []);

    const handleSaveTechnologies = async () => {
        try {
            await api.put(`/technologies/vacancy/${vacancyId}`, selectedTechnologies);
            onUpdated();
        } catch (err) {
            console.error("Не вдалося зберегти технології", err);
        }
    };

    return (
        <div className="bg-gray-200 rounded-xl p-4 shadow-sm mb-4">
            <h2 className="font-semibold text-xl text-gray-700 mb-2">Технології</h2>
            <Select
                isMulti
                placeholder="Оберіть технології"
                value={selectedTechnologies.map(tech => ({ value: tech.id, label: tech.name }))}
                options={allTechnologies.map(tech => ({ value: tech.id, label: tech.name }))}
                onChange={(selected) => {
                    const mapped = selected.map(s => ({ id: s.value, name: s.label }));
                    setSelectedTechnologies(mapped);
                }}
                className="text-black mb-3 text-xl"
            />
            <button
                onClick={handleSaveTechnologies}
                className="px-4 py-2 bg-[#FE7C7C] hover:bg-[#58618E] text-white rounded text-xl"
            >
                Змінити
            </button>
        </div>
    );
};

export default EditVacancyTechnologiesBlock;