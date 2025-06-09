import React, {useEffect, useState} from "react";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

export default function ChangeAddressModal({ ownerId, ownableType, address, onClose, onSuccess }) {
    const initialData = {
        id: address?.id || null,
        country: address?.country || "",
        city: address?.city || "",
        street: address?.street || "",
        building: address?.building || "",
        apartment: address?.apartment || ""
    };

    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        setFormData(initialData);
    }, [address]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDeleteClick = () => {
        toast.custom((t) => (
            <div
                className={`bg-white p-4 rounded-lg shadow-lg border border-gray-200 text-center w-full max-w-md mx-auto
                        transition-all ${t.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ marginTop: "180px" }}
            >
                <p className="mb-4 text-gray-800 font-medium">
                    Ви впевнені, що хочете видалити адресу?
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try {
                                await api.delete(`/address/${formData.id}`);
                                toast.success("Адресу видалено", { duration: 1000 });
                                onSuccess();
                                onClose();
                            } catch (err) {
                                console.error("Не вдалося видалити адресу", err);
                                toast.error("Помилка при видаленні адреси");
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put("/address", {
                ...formData,
                ownerId,
                ownableType
            });
            onSuccess();
            onClose();
        } catch (err) {
            console.error("Failed to update address", err);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="relative bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Додати адресу</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                        {label: "Країна", name: "country"},
                        {label: "Місто", name: "city"},
                        {label: "Вулиця", name: "street"},
                        {label: "Будинок", name: "building"},
                        {label: "Квартира", name: "apartment"},
                    ].map(({label, name}) => (
                        <div key={name}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                            <input
                                type="text"
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50"
                            />
                        </div>
                    ))}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleDeleteClick}
                            className="px-4 py-2 border border-red-400 text-red-600 rounded hover:bg-red-50"
                        >
                            Видалити
                        </button>
                        <button type="submit" className="px-4 py-2 bg-[#FE7C7C] hover:bg-[#58618E] text-white rounded">
                            Зберегти
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}