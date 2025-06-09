import React, { useState } from "react";
import AddAddressModal from "./AddAddressModal";
import ChangeAddressModal from "./ChangeAddressModal";
import { FiEdit } from "react-icons/fi";

function AddressBlock({ address, ownerId, ownableType, onAddressAdded }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClose = () => setIsModalOpen(false);

    const renderModal = () => {
        if (!address) {
            return (
                <AddAddressModal
                    ownerId={ownerId}
                    ownableType={ownableType}
                    onClose={handleClose}
                    onSuccess={onAddressAdded}
                />
            );
        } else {
            return (
                <ChangeAddressModal
                    ownerId={ownerId}
                    ownableType={ownableType}
                    address={address}
                    onClose={handleClose}
                    onSuccess={onAddressAdded}
                />
            );
        }
    };

    return (
        <div>
            <div className="flex items-center gap-6 mb-1">
                <label className="block text-xl font-medium text-gray-700">Адреса</label>
                {address && (
                    <FiEdit
                        className="text-gray-500 cursor-pointer text-xl hover:text-black"
                        onClick={() => setIsModalOpen(true)}
                        title="Редагувати адресу"
                    />
                )}
            </div>

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

            {!address && (
                <button
                    className="bg-[#FE7C7C] hover:bg-[#58618E] text-white px-4 py-2 rounded text-xl"
                    onClick={() => setIsModalOpen(true)}
                >
                    Додати адресу
                </button>
            )}

            {isModalOpen && renderModal()}
        </div>
    );
}

export default AddressBlock;
