import React, { useState } from "react";
import AddAddressModal from "./AddAddressModal";
import ChangeAddressModal from "./ChangeAddressModal";

function ClientAddressBlock({ address, ownerId, onAddressAdded }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClose = () => setIsModalOpen(false);

    const renderModal = () => {
        if (!address) {
            return (
                <AddAddressModal
                    ownerId={ownerId}
                    ownableType="CLIENT"
                    onClose={handleClose}
                    onSuccess={onAddressAdded}
                />
            );
        } else {
            return (
                <ChangeAddressModal
                    ownerId={ownerId}
                    ownableType="CLIENT"
                    address={address}
                    onClose={handleClose}
                    onSuccess={onAddressAdded}
                />
            );
        }
    };

    return (
        <div>
            <label className="block text-xl font-medium text-gray-700 mb-1">Адреса</label>
            <input
                type="text"
                readOnly
                value={
                    address
                        ? `${address.country || "-"}, ${address.city || "-"}, ${address.street || "-"}${address.building ? `, буд. ${address.building}` : ""}${address.apartment ? `, кв. ${address.apartment}` : ""}`
                        : "Адреса ще не додана"
                }
                className="block w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 mb-4"
            />

            <button
                className="bg-[#FE7C7C] hover:bg-[#58618E] text-white px-4 py-2 rounded text-xl"
                onClick={() => setIsModalOpen(true)}
            >
                {address ? "Змінити адресу" : "Додати адресу"}
            </button>

            {isModalOpen && renderModal()}
        </div>
    );
}

export default ClientAddressBlock;