'use client';

import { useState, useEffect } from 'react';

interface Place {
    id: number;
    type: string;
    name: string;
    country: string;
    latitude: number;
    longitude: number;
}

interface PaginationProps {
    places: Place[];
    perPage: number;
    setPageElements: (places: Place[]) => void;
    lang: {
        previous: string;
        next: string;
    };
}

export default function Pagination({ places, perPage, setPageElements, lang }: PaginationProps) {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setPageElements(
            places.slice((currentPage - 1) * perPage, currentPage * perPage)
        );
    }, [places, currentPage, perPage, setPageElements]);

    useEffect(() => {
        setCurrentPage(1);
    }, [places]);

    const totalPages = Math.ceil(places.length / perPage);

    if (totalPages <= 1) return null;

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    return (
        <div className="flex-1 flex items-center justify-around mt-1">
            <button
                type="button"
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md bg-white focus:outline-none active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${isFirstPage
                        ? 'text-gray-200 hover:text-gray-100 pointer-events-none'
                        : 'text-gray-700 hover:text-gray-500'
                    }`}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={isFirstPage}
            >
                {lang.previous}
            </button>

            <div>
                {currentPage} <span className="font-medium">/</span> {totalPages}
            </div>

            <button
                type="button"
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md bg-white focus:outline-none active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${isLastPage
                        ? 'text-gray-200 hover:text-gray-100 pointer-events-none'
                        : 'text-gray-700 hover:text-gray-500'
                    }`}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={isLastPage}
            >
                {lang.next}
            </button>
        </div>
    );
}
