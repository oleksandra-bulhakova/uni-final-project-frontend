import empty from '../assets/empty.png';
import React, { useRef } from 'react';
import api from '../api/axiosInstance';
import {getUserId} from "../utils/auth";

export default function ProfileHeader({ imagePath, setUser }) {
    const fileInputRef = useRef();
    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await api.post("/files/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const uploadedImageUrl = response.data;
            const userId = getUserId();

            await api.put(`/users/set-image-path/${userId}`, `"${uploadedImageUrl}"`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            setUser(prev => ({ ...prev, imagePath: uploadedImageUrl }));
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    return (
        <div className="flex items-center gap-6 mb-6">
            <div className="relative">
                <img
                    src={imagePath || empty}
                    alt="User Avatar"
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
                />
                <div
                    className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer"
                    onClick={handleIconClick}
                >
                    📷
                </div>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{display: 'none'}}
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
}
