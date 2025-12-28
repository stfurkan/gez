'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import Filter from '@/components/Filter';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

interface Place {
    id: number;
    type: string;
    name: string;
    country: string;
    latitude: number;
    longitude: number;
}

export default function HomeClient({ initialPlaces }: { initialPlaces: Place[] }) {
    const t = useTranslations('main');

    const [pageElements, setPageElements] = useState<Place[]>([]);
    const [filteredPlaces, setFilteredPlaces] = useState<Place[]>(initialPlaces);
    const [sorted, setSorted] = useState('name-asc');
    const [visits, setVisits] = useState<number[]>([]);

    useEffect(() => {
        setFilteredPlaces(initialPlaces);
    }, [initialPlaces]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedVisits = JSON.parse(localStorage.getItem('visits') || '[]');
            setVisits(storedVisits);
        }
    }, []);

    const lang = {
        visitedPlaces: t('visitedPlaces'),
        totalPlaces: t('totalPlaces'),
        noResult: t('noResult'),
        filter: {
            search: t('filter.search'),
            searchPlace: t('filter.searchPlace'),
            type: t('filter.type'),
            allTypes: t('filter.allTypes'),
            country: t('filter.country'),
            allCountries: t('filter.allCountries'),
            clearFilter: t('filter.clearFilter')
        },
        map: {
            place: t('map.place'),
            placePage: t('map.placePage')
        },
        table: {
            name: t('table.name'),
            type: t('table.type'),
            country: t('table.country'),
            visited: t('table.visited')
        },
        pagination: {
            previous: t('pagination.previous'),
            next: t('pagination.next')
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="space-y-4">
                {/* Stats */}
                <div className="text-center text-muted-foreground">
                    <span className="font-medium">{lang.visitedPlaces}:</span>{' '}
                    {visits.length} <span className="font-medium">/</span>{' '}
                    <span className="font-medium">{lang.totalPlaces}:</span>{' '}
                    {initialPlaces.length}
                </div>

                {filteredPlaces.length > 0 ? (
                    <>
                        {/* Unified Filter + Map + Table container */}
                        <div className="border rounded-lg overflow-hidden bg-card">
                            {/* Filter - no bottom radius */}
                            <Filter
                                places={initialPlaces}
                                setFilteredPlaces={setFilteredPlaces}
                                lang={lang.filter}
                                sorted={sorted}
                            />
                            {/* Map - no radius */}
                            <div className="border-t border-b">
                                <Map places={filteredPlaces} lang={lang.map} visits={visits} />
                            </div>
                            {/* Table - no top radius */}
                            <Table
                                placeList={pageElements}
                                lang={lang.table}
                                visits={visits}
                                setPlaces={setFilteredPlaces}
                                places={filteredPlaces}
                                sorted={sorted}
                                setSorted={setSorted}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        {/* Filter alone when no results */}
                        <Card>
                            <CardContent className="p-3">
                                <Filter
                                    places={initialPlaces}
                                    setFilteredPlaces={setFilteredPlaces}
                                    lang={lang.filter}
                                    sorted={sorted}
                                />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="py-8 text-center text-muted-foreground">
                                {lang.noResult}
                            </CardContent>
                        </Card>
                    </>
                )}

                <Pagination
                    places={filteredPlaces}
                    perPage={10}
                    setPageElements={setPageElements}
                    lang={lang.pagination}
                />
            </div>
        </div>
    );
}
