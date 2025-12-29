import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import PlaceClient from './PlaceClient';

import placesEn from '@/lang/en/places.json';
import placesTr from '@/lang/tr/places.json';
import langEn from '@/lang/en/lang.json';
import langTr from '@/lang/tr/lang.json';


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

export async function generateStaticParams() {
    // Only return id params - locale is handled by parent [locale] segment  
    return placesEn.map((place: any) => ({ id: String(place.id) }));
}

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string; id: string }>
}): Promise<Metadata> {
    const { locale, id } = await params;
    const places = locale === 'tr' ? placesTr : placesEn;
    const lang = locale === 'tr' ? langTr.place : langEn.place;

    const place = places.find((p: any) => String(p.id) === id);

    if (!place) {
        return { title: 'Not Found' };
    }

    return {
        title: `${place.name} ${lang.virtualTour} | Gez.la`,
        openGraph: {
            title: `${place.name} ${lang.virtualTour}`,
            description: place.description
        }
    };
}

export default async function PlacePage({
    params
}: {
    params: Promise<{ locale: string; id: string }>
}) {
    const { locale, id } = await params;
    setRequestLocale(locale);

    const places = locale === 'tr' ? placesTr : placesEn;
    const place = places.find((p: any) => String(p.id) === id) as Place | undefined;

    if (!place) {
        notFound();
    }

    return <PlaceClient place={place} />;
}
