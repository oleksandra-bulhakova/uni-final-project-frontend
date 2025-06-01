import React from "react";

function ContactList({contacts}) {
    if (!contacts || contacts.length === 0) {
        return <p>Контакти не вказано</p>;
    }

    const typeLabels = {
        MAIN_EMAIL: "Основний e-mail",
        PHONE: "Телефон",
        EMAIL: "Додатковий e-mail",
        TELEGRAM: "Telegram",
        VIBER: "Viber",
        LINK: "Посилання",
        WHATSAPP: "WhatsApp",
    };

    return (
        <div className="space-y-4 w-full">
            {contacts.map(({id, type, contact}) => (
                <div key={id}>
                    <label className="block w-full text-xl font-medium text-gray-700 mb-1">
                        {typeLabels[type] || type}
                    </label>
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
        </div>
    );
}

export default ContactList;
