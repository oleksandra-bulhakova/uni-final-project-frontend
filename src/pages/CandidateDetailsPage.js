import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosInstance";
import ContactList from "../components/ContactList";
import AddressBlock from "../components/AddressBlock";
import Select from "react-select";

export default function CandidateDetailsPage() {
    const { candidateId } = useParams();
    const [candidate, setCandidate] = useState(null);
    const [error, setError] = useState(null);
    const [resumes, setResumes] = useState([]);
    const [comments, setComments] = useState([]);
    const [currentCommentPage, setCurrentCommentPage] = useState(1);
    const [allTechnologies, setAllTechnologies] = useState([]);
    const [selectedTechnologies, setSelectedTechnologies] = useState([]);

    const commentsPerPage = 5;
    const indexOfLastComment = currentCommentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
    const totalCommentPages = Math.ceil(comments.length / commentsPerPage);

    const loadCandidate = async () => {
        try {
            const response = await api.get(`/candidates/${candidateId}`);
            setCandidate(response.data);
            setComments(response.data.comments || []);
            setResumes(response.data.attachments || []);
            setSelectedTechnologies(response.data.technologies || []);
        } catch (err) {
            console.error("Не вдалося завантажити кандидата:", err);
            setError("Кандидата не знайдено або сталася помилка");
        }
    };

    useEffect(() => {
        loadCandidate();
    }, [candidateId]);

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

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await api.post(`/attachments/${candidateId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setResumes((prev) => [...prev, response.data]);
        } catch (err) {
            console.error("Помилка при прикріпленні файлу:", err);
        }
    };

    const handleSaveTechnologies = async () => {
        try {
            await api.put(`/technologies/${candidateId}`, selectedTechnologies);
            await loadCandidate();
        } catch (err) {
            console.error("Не вдалося зберегти технології:", err);
        }
    };

    if (error) return <div className="text-center text-red-500 mt-10 text-xl">{error}</div>;
    if (!candidate) return <div className="text-center mt-10 text-xl">Завантаження...</div>;

    return (
        <div className="w-full max-w-6xl mx-auto min-h-screen p-10">
            <h2 className="text-3xl font-bold text-center mb-10">Інформація про кандидата</h2>

            <div className="flex flex-col lg:flex-row gap-10">
                <div className="flex-1 space-y-6 text-xl">
                    <div className="space-y-2">
                        <p><strong>Ім’я:</strong> {candidate.firstName}</p>
                        <p><strong>Прізвище:</strong> {candidate.lastName}</p>
                        <p><strong>Джерело:</strong> {candidate.source}</p>
                        <p><strong>Дата реєстрації:</strong> {candidate.registrationDate}</p>
                    </div>

                    <ContactList contacts={candidate.contacts} />

                    <AddressBlock
                        address={candidate.address}
                        userId={candidate.id}
                        ownableType="CANDIDATE"
                        onAddressAdded={loadCandidate}
                    />
                </div>

                <div className="flex-1 space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1 text-xl">Технології</label>
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

                    <div className="bg-gray-50 border rounded-lg p-4 shadow-sm space-y-3 text-xl">
                        <h3 className="text-xl font-semibold">Резюме</h3>
                        <label className="flex items-center justify-between border-2 border-dashed p-3 rounded cursor-pointer hover:bg-gray-100 text-base">
                            📎 Прикріпити файл
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                        </label>
                        {resumes.length > 0 && (
                            <ul className="space-y-2">
                                {resumes.map((resume) => (
                                    <li key={resume.id}>
                                        <a
                                            href={resume.attachmentPath}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-700 underline text-sm block"
                                        >
                                            📄 {resume.attachmentPath.split("_").slice(1).join("_")}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-4">Коментарі</h3>
                        {currentComments.map(comment => (
                            <div key={comment.id} className="border p-3 rounded mb-3 shadow-sm">
                                <div className="flex items-center gap-3 mb-1">
                                    {comment.author.imagePath && (
                                        <img src={comment.author.imagePath} alt="avatar" className="w-8 h-8 rounded-full" />
                                    )}
                                    <span className="font-semibold">{comment.author.firstName} {comment.author.lastName}</span>
                                    <span className="text-gray-500 text-sm ml-auto">{comment.date}</span>
                                </div>
                                <p className="text-gray-800">{comment.description}</p>
                            </div>
                        ))}
                        <div className="flex justify-center gap-2 mt-4">
                            {Array.from({ length: totalCommentPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentCommentPage(i + 1)}
                                    className={`px-3 py-1 rounded ${
                                        currentCommentPage === i + 1
                                            ? "bg-gray-800 text-white"
                                            : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}