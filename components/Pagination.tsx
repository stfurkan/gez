'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
        <div className="flex items-center justify-center gap-4 mt-4">
            <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={isFirstPage}
                className="gap-1 cursor-pointer"
            >
                <ChevronLeft className="h-4 w-4" />
                {lang.previous}
            </Button>

            <span className="text-sm text-muted-foreground">
                {currentPage} <span className="font-medium">/</span> {totalPages}
            </span>

            <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={isLastPage}
                className="gap-1 cursor-pointer"
            >
                {lang.next}
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
