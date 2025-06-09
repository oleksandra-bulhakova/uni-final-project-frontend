import React, {useState} from "react";
import EditContactModal from "./EditContactModal";
import AddContactModal from "./AddContactModal";
import {FiEdit} from "react-icons/fi";

function ContactList({contacts, ownerId, ownableType, onContactAdded}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModalData, setEditModalData] = useState(null);

    if (!contacts || contacts.length === 0) {
        return <p>Контакти не вказано</p>;
    }

    const typeLabels = {
        MAIN_EMAIL: "Основний e-mail",
        PHONE: "Телефон",
        EMAIL: "E-mail",
        TELEGRAM: "Telegram",
        VIBER: "Viber",
        LINK: "Посилання",
        WHATSAPP: "WhatsApp",
    };

    return (
        <div className="space-y-4 w-full">
                <label className="block text-xl font-medium text-gray-700">Контакти</label>
                <button
                    className="bg-[#FE7C7C] hover:bg-[#58618E] text-white px-4 py-2 rounded text-xl"
                    onClick={() => setIsModalOpen(true)}
                >
                    Додати контакт
                </button>
            {contacts
                .filter(({contact}) => contact && contact.trim() !== "")
                .map(({id, type, contact}) => (
                    <div key={id}>
                        <div className="flex items-center gap-6 mb-1">
                            <label className="text-xl font-medium text-gray-700">
                                {typeLabels[type] || type}
                            </label>
                            {type !== "MAIN_EMAIL" && (
                                <FiEdit
                                    className="text-gray-500 cursor-pointer text-xl hover:text-black"
                                    onClick={() => setEditModalData({ id, contact })}
                                />
                            )}
                        </div>
                            {type === "LINK" ? (
                                <a
                                    href={contact.startsWith("http") ? contact : `https://${contact}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-blue-700 underline break-words text-base"
                                >
                                    {contact}
                                </a>
                            ) : (
                                <input
                                    type="text"
                                    value={contact}
                                    readOnly
                                    className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                                />
                            )}
                        </div>
                        ))}
                        {isModalOpen && (
                            <AddContactModal
                                ownerId={ownerId}
                                ownableType={ownableType}
                                onClose={() => setIsModalOpen(false)}
                                onSuccess={onContactAdded}
                            />
                        )}
                        {editModalData && (
                            <EditContactModal
                                contactId={editModalData.id}
                                initialContact={editModalData.contact}
                                onClose={() => setEditModalData(null)}
                                onSuccess={onContactAdded}
                            />
                        )}
                    </div>
                );
            }

            export default ContactList;
