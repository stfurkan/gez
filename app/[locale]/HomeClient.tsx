'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useLocale, useTranslations } from 'next-intl';
import Filter from '@/components/Filter';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';

import placesEn from '@/lang/en/places.json';
import placesTr from '@/lang/tr/places.json';

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
    const locale = useLocale();
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
        <div>
            <main className="px-2 sm:px-8">
                <div className="text-lg sm:text-xl text-center pb-2">
                    <span className="font-medium">{lang.visitedPlaces}:</span>{' '}
                    {visits.length} <span className="font-medium">/</span>{' '}
                    <span className="font-medium">{lang.totalPlaces}:</span>{' '}
                    {initialPlaces.length}
                </div>
                <Filter
                    places={initialPlaces}
                    setFilteredPlaces={setFilteredPlaces}
                    lang={lang.filter}
                    sorted={sorted}
                />
                {filteredPlaces.length > 0 ? (
                    <>
                        <Map places={filteredPlaces} lang={lang.map} visits={visits} />
                        <Table
                            placeList={pageElements}
                            lang={lang.table}
                            visits={visits}
                            setPlaces={setFilteredPlaces}
                            places={filteredPlaces}
                            sorted={sorted}
                            setSorted={setSorted}
                        />
                    </>
                ) : (
                    <div className="bg-white font-medium text-xl text-center mx-auto sm:mx-6 mt-3 p-5 rounded-md shadow-lg">
                        {lang.noResult}
                    </div>
                )}

                <Pagination
                    places={filteredPlaces}
                    perPage={10}
                    setPageElements={setPageElements}
                    lang={lang.pagination}
                />
            </main>
        </div>
    );
}
