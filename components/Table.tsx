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
            return <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />;
        }

        return currentDirection === 'asc'
            ? <ArrowUp className="ml-2 h-4 w-4" />
            : <ArrowDown className="ml-2 h-4 w-4" />;
    };

    return (
        <div className="bg-card">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-muted/50">
                        <TableHead
                            className="cursor-pointer select-none"
                            onClick={() => handleSort('name')}
                        >
                            <div className="flex items-center font-semibold">
                                {lang.name}
                                {getSortIcon('name')}
                            </div>
                        </TableHead>
                        <TableHead
                            className="cursor-pointer select-none"
                            onClick={() => handleSort('type')}
                        >
                            <div className="flex items-center font-semibold">
                                {lang.type}
                                {getSortIcon('type')}
                            </div>
                        </TableHead>
                        <TableHead
                            className="cursor-pointer select-none"
                            onClick={() => handleSort('country')}
                        >
                            <div className="flex items-center font-semibold">
                                {lang.country}
                                {getSortIcon('country')}
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {placeList.map(place => (
                        <TableRow key={place.id} className="cursor-pointer hover:bg-muted/50">
                            <TableCell>
                                <Link href={`/place/${place.id}`} className="block py-2 cursor-pointer">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{place.name}</span>
                                        {visits.includes(place.id) && (
                                            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                                {lang.visited}
                                            </Badge>
                                        )}
                                    </div>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`/place/${place.id}`} className="block py-2 cursor-pointer">
                                    {place.type}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`/place/${place.id}`} className="block py-2 cursor-pointer">
                                    {place.country}
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
