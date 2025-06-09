import React, {useState} from "react";
import {Link} from "react-router-dom";

function VacancyList({vacancies}) {
    const [currentPage, setCurrentPage] = useState(1);
    const vacanciesPerPage = 10;

    const totalPages = Math.ceil(vacancies.length / vacanciesPerPage);
    const startIndex = (currentPage - 1) * vacanciesPerPage;
    const currentVacancies = vacancies.slice(startIndex, startIndex + vacanciesPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="space-y-3">
            <h2 className="text-xl text-gray-700 font-medium">Вакансії</h2>
            {currentVacancies.map((vacancy) => (
                <div key={vacancy.id} className="border p-3 rounded-md shadow-sm text-xl">
                    <Link
                        to={`/vacancies/${vacancy.id}`}
                        className="text-blue-600 hover:underline"
                    >
                        {vacancy.name}
                    </Link>
                </div>
            ))}

            <div className="flex gap-2 mt-4 justify-center">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Prev
                </button>

                {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 border rounded ${
                            currentPage === page ? "bg-blue-200 font-bold" : ""
                        }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default VacancyList;