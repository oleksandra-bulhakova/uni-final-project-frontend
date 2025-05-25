import React from "react";
import { FiEdit } from "react-icons/fi";

function UserDetails({ firstName, lastName, userRole }) {
    return (
        <div className="space-y-6 w-full">

            <div className="relative w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Ім’я</label>
                <input
                    type="text"
                    readOnly
                    value={firstName}
                    className="block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                    style={{ minWidth: "100%" }}
                />
                <FiEdit className="absolute right-3 top-9 text-gray-500 cursor-pointer"/>
            </div>

            <div className="relative">
                <label className="block text-sm font-medium text-gray-700">Прізвище</label>
                <input
                    type="text"
                    readOnly
                    value={lastName}
                    className="block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                    style={{ minWidth: "100%" }}
                />
                <FiEdit className="absolute right-3 top-9 text-gray-500 cursor-pointer"/>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Роль</label>
                <input
                    type="text"
                    readOnly
                    value={userRole}
                    className="block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                    style={{ minWidth: "100%" }}
                />
            </div>
        </div>
    );
}

export default UserDetails;