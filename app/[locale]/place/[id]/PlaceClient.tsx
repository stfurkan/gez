'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Share from '@/components/Share';

interface Place {
    id: number;
    name: string;
    type: string;
    description: string;
    city: string;
    state: string;
    country: string;
    website: string;
    virtual: string;
    wikipedia: string;
}

export default function PlaceClient({ place }: { place: Place }) {
    const locale = useLocale();
    const pathname = usePathname();
    const t = useTranslations('place');

    const visitPlace = () => {
        if (typeof window !== 'undefined') {
            let visits = JSON.parse(localStorage.getItem('visits') || '[]');
            if (!visits.includes(place.id)) {
                visits = [...visits, place.id];
                localStorage.setItem('visits', JSON.stringify(visits));
            }
        }
    };

    const lang = {
        back: t('back'),
        virtualTour: t('virtualTour'),
        type: t('type'),
        address: t('address'),
        description: t('description'),
        wikipedia: t('wikipedia'),
        share: {
            share: t('share.share'),
            email: t('share.email'),
            copyLink: t('share.copyLink'),
            copyLinkSuccess: t('share.copyLinkSuccess')
        }
    };

    const placeType = t(place.type);
    const fullUrl = typeof window !== 'undefined'
        ? `${window.location.origin}${pathname}`
        : '';

    return (
        <>
            <div className="flex flex-row justify-between mx-8 pb-1 text-center">
                <Link href="/">
                    <button
                        type="button"
                        className="text-xl bg-red-700 hover:bg-red-900 text-white p-2 rounded inline-flex items-center focus:outline-none"
                    >
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            className="w-6 h-6"
                        >
                            <path d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                        </svg>
                        <span className="font-medium">{lang.back}</span>
                    </button>
                </Link>

                <Share
                    lang={lang.share}
                    url={fullUrl}
                    title={`${place.name} ${lang.virtualTour}`}
                />
            </div>

            <div className="bg-white shadow overflow-hidden rounded-lg mx-8">
                <div className="flex flex-col sm:flex-row sm:justify-between items-center px-3 py-3 border-b border-gray-500 mx-3">
                    <a
                        href={place.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-3xl leading-6 font-bold text-gray-900 hover:text-gray-600 text-center sm:text-left"
                    >
                        <h1>{place.name}</h1>
                    </a>
                    <a
                        href={place.virtual}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 mt-3 sm:mt-0 rounded-lg text-2xl bg-blue-600 hover:bg-blue-800 text-white text-center"
                        onClick={() => visitPlace()}
                    >
                        {lang.virtualTour}
                    </a>
                </div>
                <div className="flex flex-col px-3 py-3 mx-3">
                    <div className="bg-gray-50 px-4 py-2 items-center sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <div className="text-3xl font-bold">{lang.type}</div>
                        <div className="text-lg sm:mt-0 sm:col-span-2">
                            {placeType}
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-2 items-center sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <div className="text-3xl font-bold">{lang.address}</div>
                        <div className="text-lg sm:mt-0 sm:col-span-2">
                            {place.state === ''
                                ? `${place.city}, ${place.country}`
                                : `${place.city}, ${place.state}, ${place.country}`}
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-2 items-center sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <div className="text-3xl font-bold">{lang.description}</div>
                        <div className="text-lg sm:mt-0 sm:col-span-2">
                            {place.description}{' '}
                            {place.wikipedia !== '' && (
                                <a
                                    className="text-xs text-white bg-green-700 hover:bg-green-800 p-1 rounded-md"
                                    href={place.wikipedia}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {lang.wikipedia}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
