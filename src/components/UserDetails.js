import React, {useState} from "react";
import EditUserStatusModal from "./EditUserStatusModal";
import {FiEdit} from "react-icons/fi";
import {getUserRole} from "../utils/auth";

function UserDetails({firstName, lastName, userRole, userStatus, userId, onStatusChanged}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const role = getUserRole();

    console.log("Detected role:", role);

    return (
        <div className="space-y-6 w-full">

            <div className="relative w-full">
                <label className="block text-xl font-medium text-gray-700 mb-1">Ім’я</label>
                <input
                    type="text"
                    readOnly
                    value={firstName}
                    className="block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                    style={{minWidth: "100%"}}
                />
            </div>

            <div className="relative">
                <label className="block text-xl font-medium text-gray-700">Прізвище</label>
                <input
                    type="text"
                    readOnly
                    value={lastName}
                    className="block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                    style={{minWidth: "100%"}}
                />
            </div>

            <div>
                <label className="block text-xl font-medium text-gray-700">Роль</label>
                <input
                    type="text"
                    readOnly
                    value={userRole}
                    className="block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                    style={{minWidth: "100%"}}
                />
            </div>
            <div className="relative">
                <div className="flex items-center gap-6 mb-1">
                    <label className="text-xl font-medium text-gray-700">Статус</label>
                    {role === 'OWNER' && (
                        <FiEdit
                            className="text-gray-500 cursor-pointer text-xl hover:text-black"
                            onClick={() => setIsModalOpen(true)}
                        />
                    )}
                </div>
                <input
                    type="text"
                    readOnly
                    value={userStatus ? "Активний" : "Неактивний"}
                    className="block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                />
            </div>
            {isModalOpen && (
                <EditUserStatusModal
                    userId={userId}
                    currentStatus={userStatus}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={() => {
                        setIsModalOpen(false);
                        onStatusChanged();
                    }}
                />
            )}
        </div>
    );
}

export default UserDetails;