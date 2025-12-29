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

    // Calculate progress percentage
    const progressPercentage = initialPlaces.length > 0
        ? Math.round((visits.length / initialPlaces.length) * 100 * 10) / 10
        : 0;

    const lang = {
        visitedPlaces: t('visitedPlaces'),
        totalPlaces: t('totalPlaces'),
        journeyTitle: t('journeyTitle'),
        placesExplored: t('placesExplored'),
        complete: t('complete'),
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
                {/* Journey Progress Card */}
                <div className="bg-card border rounded-lg p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-primary"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                                    <path d="M2 12h20" />
                                </svg>
                            </div>
                            <span className="font-semibold text-foreground">{lang.journeyTitle}</span>
                        </div>
                        <span className="text-sm font-medium text-primary">
                            {progressPercentage}% {lang.complete}
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
                        <div
                            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${Math.max(progressPercentage, 1)}%` }}
                        />
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                            <span className="font-semibold text-foreground">{visits.length}</span> / {initialPlaces.length} {lang.placesExplored}
                        </span>
                    </div>
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
