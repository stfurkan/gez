import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

interface Place {
    id: number;
    name: string;
    type: string;
    country: string;
}

function getPlaces(): Place[] {
    const filePath = path.join(process.cwd(), 'lang/en/places.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://gez.la';
    const places = getPlaces();
    const currentDate = new Date().toISOString().split('T')[0];

    // Static pages
    const staticPages = [
        { path: '', priority: 1.0 },
        { path: '/about', priority: 0.8 },
        { path: '/terms', priority: 0.5 },
    ];

    const urls: MetadataRoute.Sitemap = [];

    // Add static pages for each locale
    staticPages.forEach(({ path: pagePath, priority }) => {
        // English (default, no prefix)
        urls.push({
            url: `${baseUrl}${pagePath}`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority,
        });

        // Turkish (with /tr prefix)
        urls.push({
            url: `${baseUrl}/tr${pagePath}`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority,
        });
    });

    // Add place pages for each locale
    places.forEach((place) => {
        // English (default, no prefix)
        urls.push({
            url: `${baseUrl}/place/${place.id}`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        });

        // Turkish (with /tr prefix)
        urls.push({
            url: `${baseUrl}/tr/place/${place.id}`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        });
    });

    return urls;
}
