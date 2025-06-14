import React, { useState } from "react";
import api from "../api/axiosInstance";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import empty from "../assets/empty.png";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LabelList, Cell
} from "recharts"

export default function UserActivityReportPage() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [report, setReport] = useState([]);
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 border rounded shadow text-base">
                    <p className="font-semibold">{label}</p>
                    <p>Кількість: {payload[0].value}</p>
                </div>
            );
        }
        return null;
    };

    const fetchReport = async () => {
        if (!startDate || !endDate) return;
        try {
            const response = await api.get("/candidates/report", {
                params: {
                    start: startDate.toISOString().slice(0, 19),
                    end: endDate.toISOString().slice(0, 19)
                }
            });
            setReport(response.data);
        } catch (error) {
            console.error("Не вдалося завантажити звіт:", error);
        }
    };

    const total = report.reduce((acc, user) => {
        acc.added += user.added || 0;
        acc.preScreens += user.preScreens || 0;
        acc.englishCheck += user.englishCheck || 0;
        acc.interviews += user.interviews || 0;
        acc.offers += user.offers || 0;
        acc.hires += user.hires || 0;
        return acc;
    }, {
        added: 0,
        preScreens: 0,
        englishCheck: 0,
        interviews: 0,
        offers: 0,
        hires: 0
    });

    const chartData = [
        { name: "Додано", value: total.added, color: "#A5EA6D" },
        { name: "Pre-screen", value: total.preScreens, color: "#6BB7FF" },
        { name: "Чек англійської", value: total.englishCheck, color: "#FFA76B" },
        { name: "Інтерв’ю", value: total.interviews, color: "#FDC841" },
        { name: "Офер", value: total.offers, color: "#DA88FF" },
        { name: "Найнято", value: total.hires, color: "#FF7A94" }
    ];

    return (
        <div className="w-full max-w-6xl mx-auto p-10 min-h-screen text-xl">
            <div className="flex justify-center mb-10">
                <h2 className="text-3xl font-bold">Звіт</h2>
            </div>
            <div className="flex justify-between items-center mb-8 gap-6">
                <div className="flex items-center gap-4">
                    <label className="text-lg font-medium">Від:</label>
                    <DatePicker
                        selected={startDate}
                        onChange={setStartDate}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        className="px-3 py-2 border rounded"
                        placeholderText="Дата початку"
                        showTimeSelect
                        dateFormat="Pp"
                    />
                    <label className="text-lg font-medium">До:</label>
                    <DatePicker
                        selected={endDate}
                        onChange={setEndDate}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        className="px-3 py-2 border rounded"
                        placeholderText="Дата завершення"
                        showTimeSelect
                        dateFormat="Pp"
                    />
                </div>
                <button
                    onClick={fetchReport}
                    className="bg-[#9DE25D] hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                    Сформувати
                </button>
            </div>

            <table className="w-full text-left border-collapse text-xl">
                <thead>
                <tr className="text-gray-500 border-b">
                    <th className="py-3">Рекрутер</th>
                    <th className="py-3">Додано</th>
                    <th className="py-3">Pre-screen</th>
                    <th className="py-3">Чек англійської</th>
                    <th className="py-3">Інтерв’ю</th>
                    <th className="py-3">Офер</th>
                    <th className="py-3">Найнято</th>
                </tr>
                </thead>
                <tbody>
                {report.map(user => (
                    <tr key={user.userId} className="hover:bg-gray-50">
                        <td className="py-3 flex items-center gap-3">
                            <img
                                src={user.imagePath || empty}
                                alt="avatar"
                                className="w-10 h-10 rounded-full object-cover border"
                            />
                            <a
                                href={`/user/${user.userId}`}
                                className="text-blue-600 hover:underline"
                            >
                                {user.firstName} {user.lastName}
                            </a>
                        </td>
                        <td className="py-3 text-center">{user.added || 0}</td>
                        <td className="py-3 text-center">{user.preScreens || 0}</td>
                        <td className="py-3 text-center">{user.englishCheck || 0}</td>
                        <td className="py-3 text-center">{user.interviews || 0}</td>
                        <td className="py-3 text-center">{user.offers || 0}</td>
                        <td className="py-3 text-center">{user.hires || 0}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {report.length > 0 && (
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold mb-4">Загальна активність</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                            data={chartData}
                            layout="vertical"
                            margin={{top: 20, right: 50, left: 100, bottom: 20}}
                            barCategoryGap={20}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis type="number" allowDecimals={false}/>
                            <YAxis type="category" dataKey="name"/>
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="value" barSize={30}>
                                <LabelList dataKey="value" position="right"/>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color}/>
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}
