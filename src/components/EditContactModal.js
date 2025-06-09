import React, {useState} from "react";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

export default function EditContactModal({contactId, initialContact, onClose, onSuccess}) {
    const [contact, setContact] = useState(initialContact);

    const handleUpdate = async () => {
        try {
            await api.put(`/contact/${contactId}`, {contact});
            toast.success("Контакт оновлено");
            onSuccess();
            onClose();
        } catch (err) {
            toast.error("Не вдалося оновити контакт");
            console.error(err);
        }
    };

    const handleDelete = async () => {
        toast.custom((t) => (
            <div
                className={`bg-white p-4 rounded-lg shadow-lg border border-gray-200 text-center w-full max-w-md mx-auto
                        transition-all ${t.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{marginTop: "180px"}}
            >
                <p className="mb-4 text-gray-800 font-medium">
                    Ви впевнені, що хочете видалити контакт?
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try {
                                await api.delete(`/contact/${contactId}`);
                                toast.success("Контакт видалено", {duration: 1000});
                                onSuccess();
                                onClose();
                            } catch (err) {
                                console.error("Не вдалося видалити контакт", err);
                                toast.error("Помилка при видаленні контакта");
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
        ), {duration: Infinity});
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold mb-4 text-gray-800">Редагувати контакт</h2>

                <label className="block text-sm font-medium text-gray-700 mb-1">Контакт</label>
                <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 mb-6"
                />

                <div className="flex justify-end gap-3 pt-2">
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 border border-red-400 text-red-600 rounded hover:bg-red-50"
                    >
                        Видалити
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-[#FE7C7C] hover:bg-[#58618E] text-white rounded"
                    >
                        Зберегти
                    </button>
                </div>
            </div>
        </div>
    );
}