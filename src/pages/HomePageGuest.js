import React from "react";

export default function HomePageGuest() {
    return (
        <div
            className="w-full min-h-screen bg-[#f6f6f6] text-gray-800 flex flex-col md:flex-row items-center justify-center px-4">
            <div
                className="hidden md:flex w-64 h-full bg-[#e8e8e8] flex-col items-center justify-center p-6 gap-6 mt-[-200px]">
                <div className="bg-white shadow-md rounded-lg p-4 text-center text-gray-600 font-semibold">
                    🤖 SmartBase - <br/> ваш помічник у рекрутингу
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 text-center text-gray-600 font-semibold">
                    📊 Аналітика <br/> по вакансіях та кандидатах
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 text-center text-gray-600 font-semibold">
                    🔍 Зручний інтерфейс <br/> та інтуїтивна навігація
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 text-center text-gray-600 font-semibold">
                    👥 Спільна робота <br/> з командою рекрутерів
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center mt-[-200px] py-10 ml-[-40px]">
                <div className="flex justify-center -mt-6 mb-6">
                    <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 text-center">
                        <h2 className="text-2xl font-semibold mb-3 text-gray-700">
                            🌟 Вітаємо у SmartBase!
                        </h2>
                        <p className="text-lg text-gray-600">
                            Створено спеціально для рекрутерів, які цінують свій час і хочуть працювати ефективніше.
                            Спробуйте інструмент, що допоможе автоматизувати рутину та зосередитися на головному -
                            людях.
                        </p>
                    </div>
                </div>

                <div className="max-w-3xl text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        SmartBase - сучасна система для автоматизації рекрутингу
                    </h1>

                    <p className="text-xl mb-10">
                        Керуйте вакансіями, кандидатами та замовниками в єдиній зручній платформі.
                        Аналітика, гнучкий контроль, історія дій - усе, що потрібно команді рекрутерів.
                    </p>

                    <div className="flex justify-center gap-6">
                        <div
                            className="bg-[#FE7C7C] text-white text-lg px-6 py-3 rounded cursor-default">
                            🔒 Авторизуйтесь, щоб почати роботу
                        </div>
                        <div
                            className="bg-[#5DAD5D] text-white text-lg px-6 py-3 rounded cursor-default">
                            🚀 Рекрутинговий процес під контролем
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
