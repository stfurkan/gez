import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import HomeClient from './HomeClient';

import placesEn from '@/lang/en/places.json';
import placesTr from '@/lang/tr/places.json';
import langEn from '@/lang/en/lang.json';
import langTr from '@/lang/tr/lang.json';

interface Place {
    id: number;
    type: string;
    name: string;
    country: string;
    latitude: number;
    longitude: number;
}

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const lang = locale === 'tr' ? langTr.main : langEn.main;

    return {
        title: lang.pageTitle,
        description: lang.pageDescription,
        openGraph: {
            title: lang.pageTitle,
            description: lang.pageDescription
        }
    };
}

export default async function HomePage({
    params
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const rawPlaces = locale === 'tr' ? placesTr : placesEn;
    const lang = locale === 'tr' ? langTr.main : langEn.main;

    // Transform places with translated types
    const places: Place[] = rawPlaces.map((place: any) => ({
        id: place.id,
        type: (lang as any)[place.type] || place.type,
        name: place.name,
        country: place.country,
        latitude: place.latitude,
        longitude: place.longitude
    }));

    // Sort by name
    const sortedPlaces = [...places].sort((a, b) => a.name.localeCompare(b.name));

    return <HomeClient initialPlaces={sortedPlaces} />;
}
