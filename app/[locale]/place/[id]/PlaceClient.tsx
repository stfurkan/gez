'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
        <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
                {/* Action Buttons */}
                <div className="flex flex-row justify-between items-center">
                    <Link href="/">
                        <Button variant="destructive" className="gap-2 cursor-pointer">
                            <ArrowLeft className="w-4 h-4" />
                            {lang.back}
                        </Button>
                    </Link>

                    <Share
                        lang={lang.share}
                        url={fullUrl}
                        title={`${place.name} ${lang.virtualTour}`}
                    />
                </div>

                {/* Place Card */}
                <Card>
                    <CardHeader className="border-b">
                        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
                            <a
                                href={place.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-2xl sm:text-3xl font-bold hover:text-primary transition-colors text-center sm:text-left cursor-pointer"
                            >
                                <h1>{place.name}</h1>
                            </a>
                            <a
                                href={place.virtual}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => visitPlace()}
                                className="cursor-pointer"
                            >
                                <Button size="lg" className="gap-2 text-lg cursor-pointer">
                                    <ExternalLink className="w-5 h-5" />
                                    {lang.virtualTour}
                                </Button>
                            </a>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        {/* Type */}
                        <div className="grid sm:grid-cols-4 gap-2 p-4 rounded-lg bg-muted/50">
                            <div className="text-lg sm:text-xl font-semibold">{lang.type}</div>
                            <div className="sm:col-span-3 text-muted-foreground">
                                {placeType}
                            </div>
                        </div>

                        {/* Address */}
                        <div className="grid sm:grid-cols-4 gap-2 p-4 rounded-lg bg-muted/50">
                            <div className="text-lg sm:text-xl font-semibold">{lang.address}</div>
                            <div className="sm:col-span-3 text-muted-foreground">
                                {place.state === ''
                                    ? `${place.city}, ${place.country}`
                                    : `${place.city}, ${place.state}, ${place.country}`}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="grid sm:grid-cols-4 gap-2 p-4 rounded-lg bg-muted/50">
                            <div className="text-lg sm:text-xl font-semibold">{lang.description}</div>
                            <div className="sm:col-span-3 text-muted-foreground">
                                {place.description}{' '}
                                {place.wikipedia !== '' && (
                                    <a
                                        href={place.wikipedia}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cursor-pointer"
                                    >
                                        <Badge variant="secondary" className="ml-2 cursor-pointer hover:bg-primary hover:text-primary-foreground">
                                            {lang.wikipedia}
                                        </Badge>
                                    </a>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
