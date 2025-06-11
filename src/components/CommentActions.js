import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

export default function CommentActions({ comment, onUpdated }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(comment.description);

    const handleUpdate = async () => {
        try {
            await api.put(`/comments/${comment.id}`, {
                description: editedDescription
            });
            toast.success("Коментар оновлено");
            setIsEditing(false);
            onUpdated();
        } catch (err) {
            console.error("Помилка при оновленні коментаря", err);
            toast.error("Не вдалося оновити коментар");
        }
    };

    const handleDelete = () => {
        toast.custom((t) => (
            <div
                className={`bg-white p-4 rounded-lg shadow-lg border border-gray-200 text-center w-full max-w-md mx-auto transition-all ${t.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ marginTop: "180px" }}
            >
                <p className="mb-4 text-gray-800 font-medium">
                    Ви впевнені, що хочете видалити коментар?
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try {
                                await api.delete(`/comments/${comment.id}`);
                                toast.success("Коментар видалено", { duration: 1000 });
                                onUpdated();
                            } catch (err) {
                                console.error("Помилка при видаленні коментаря", err);
                                toast.error("Не вдалося видалити коментар");
                            }
                        }}
                        className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Так
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-4 py-1 border rounded hover:bg-gray-100"
                    >
                        Ні
                    </button>
                </div>
            </div>
        ), { duration: Infinity });
    };

    return (
        <div className="mt-2 space-y-2">
            {isEditing ? (
                <>
                    <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        className="w-full border px-3 py-2 rounded resize-none text-base"
                        rows={3}
                    />
                    <div className="flex gap-3 justify-end">
                        <button
                            onClick={handleUpdate}
                            className="px-4 py-2 bg-[#FE7C7C] text-white rounded hover:bg-[#58618E]"
                        >
                            Зберегти
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 border rounded hover:bg-gray-100"
                        >
                            Скасувати
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex gap-3 justify-end">
                    <FiEdit
                        className="text-gray-500 cursor-pointer hover:text-black"
                        onClick={() => setIsEditing(true)}
                        title="Редагувати"
                    />
                    <FiTrash2
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        onClick={handleDelete}
                        title="Видалити"
                    />
                </div>
            )}
        </div>
    );
}
