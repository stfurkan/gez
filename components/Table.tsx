'use client';

import Link from 'next/link';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import sort from '@/lib/sort';

interface Place {
    id: number;
    type: string;
    name: string;
    country: string;
    latitude: number;
    longitude: number;
}

interface DataTableProps {
    placeList: Place[];
    lang: {
        name: string;
        type: string;
        country: string;
        visited: string;
    };
    visits: number[];
    setPlaces: (places: Place[]) => void;
    places: Place[];
    sorted: string;
    setSorted: (sorted: string) => void;
}

export default function DataTable({
    placeList,
    lang,
    visits,
    setPlaces,
    places,
    sorted,
    setSorted
}: DataTableProps) {
    const handleSort = (column: string) => {
        const currentDirection = sorted.split('-')[1];
        const currentColumn = sorted.split('-')[0];

        if (currentColumn === column) {
            const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
            setPlaces(sort(places, column, newDirection));
            setSorted(`${column}-${newDirection}`);
        } else {
            setPlaces(sort(places, column, 'asc'));
            setSorted(`${column}-asc`);
        }
    };

    const getSortIcon = (column: string) => {
        const currentColumn = sorted.split('-')[0];
        const currentDirection = sorted.split('-')[1];

        if (currentColumn !== column) {
            return <ArrowUpDown className="ml-1 h-3 w-3 text-muted-foreground shrink-0" />;
        }

        return currentDirection === 'asc'
            ? <ArrowUp className="ml-1 h-3 w-3 shrink-0" />
            : <ArrowDown className="ml-1 h-3 w-3 shrink-0" />;
    };

    return (
        <div className="bg-card">
            <Table className="w-full table-fixed">
                <TableHeader>
                    <TableRow className="hover:bg-muted/50">
                        <TableHead
                            className="cursor-pointer select-none w-[40%]"
                            onClick={() => handleSort('name')}
                        >
                            <div className="flex items-center font-semibold text-xs sm:text-sm">
                                {lang.name}
                                {getSortIcon('name')}
                            </div>
                        </TableHead>
                        <TableHead
                            className="cursor-pointer select-none w-[35%]"
                            onClick={() => handleSort('type')}
                        >
                            <div className="flex items-center font-semibold text-xs sm:text-sm">
                                {lang.type}
                                {getSortIcon('type')}
                            </div>
                        </TableHead>
                        <TableHead
                            className="cursor-pointer select-none w-[25%]"
                            onClick={() => handleSort('country')}
                        >
                            <div className="flex items-center font-semibold text-xs sm:text-sm">
                                {lang.country}
                                {getSortIcon('country')}
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {placeList.map(place => (
                        <TableRow key={place.id} className="cursor-pointer hover:bg-muted/50">
                            <TableCell className="py-2 px-2 sm:px-4">
                                <Link href={`/place/${place.id}`} className="block cursor-pointer">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                        <span className="font-medium text-xs sm:text-sm break-words whitespace-normal">{place.name}</span>
                                        {visits.includes(place.id) && (
                                            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-xs w-fit shrink-0">
                                                {lang.visited}
                                            </Badge>
                                        )}
                                    </div>
                                </Link>
                            </TableCell>
                            <TableCell className="py-2 px-2 sm:px-4">
                                <Link href={`/place/${place.id}`} className="block cursor-pointer">
                                    <span className="text-xs sm:text-sm break-words whitespace-normal">{place.type}</span>
                                </Link>
                            </TableCell>
                            <TableCell className="py-2 px-2 sm:px-4">
                                <Link href={`/place/${place.id}`} className="block cursor-pointer">
                                    <span className="text-xs sm:text-sm break-words whitespace-normal">{place.country}</span>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
