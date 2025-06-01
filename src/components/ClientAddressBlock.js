import React, { useState } from "react";
import AddAddressModal from "./AddAddressModal";

function ClientAddressBlock({ address, clientId, onAddressAdded }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!address) {
        return (
            <>
                <button
                    className="bg-[#FE7C7C] hover:bg-[#58618E] text-white px-4 py-2 rounded text-xl"
                    onClick={() => setIsModalOpen(true)}
                >
                    Додати адресу
                </button>

                {isModalOpen && (
                    <AddAddressModal
                        ownerId={clientId}
                        ownableType="CLIENT"
                        onClose={() => setIsModalOpen(false)}
                        onSuccess={onAddressAdded}
                    />
                )}
            </>
        );
    }

    const { country, city, street, building, apartment } = address;

    return (
        <div>
            <label className="block text-xl font-medium text-gray-700 mb-1">Адреса</label>
            <input
                type="text"
                readOnly
                value={`${country || "-"}, ${city || "-"}, ${street || "-"}${building ? `, буд. ${building}` : ""}${apartment ? `, кв. ${apartment}` : ""}`}
                className="block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
            />
        </div>
    );
}

export default ClientAddressBlock;