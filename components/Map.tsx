'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import Link from 'next/link';
import { useLocale } from 'next-intl';

import 'leaflet/dist/leaflet.css';

interface Place {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

interface MapProps {
    places: Place[];
    lang: {
        place: string;
        placePage: string;
    };
    visits: number[];
}

export default function Map({ places, lang, visits }: MapProps) {
    const locale = useLocale();
    const mapRef = useRef<L.Map | null>(null);
    const layerRef = useRef<L.LayerGroup | null>(null);

    // create map
    useEffect(() => {
        if (mapRef.current) return; // Already initialized

        mapRef.current = L.map('placeMap', {
            zoom: 1,
            minZoom: 1,
            maxZoom: 18,
            maxBounds: [
                [-100, -190],
                [100, 190]
            ],
            center: [30, 30],
            worldCopyJump: true,
            attributionControl: false,
            layers: [
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                })
            ]
        });

        // Add attribution control with Leaflet text but no flag
        L.control.attribution({ prefix: '<a href="https://leafletjs.com" target="_blank">Leaflet</a>' }).addTo(mapRef.current!);

        layerRef.current = L.layerGroup().addTo(mapRef.current);

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    const greenIcon = new L.Icon({
        iconUrl: '/img/marker/marker-green.png',
        shadowUrl: '/img/marker/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const blueIcon = new L.Icon({
        iconUrl: '/img/marker/marker-blue.png',
        shadowUrl: '/img/marker/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // update markers
    useEffect(() => {
        if (!layerRef.current) return;

        layerRef.current.clearLayers();
        places.forEach(place => {
            const isVisited = visits.includes(place.id);
            const marker = L.marker([place.latitude, place.longitude], {
                icon: isVisited ? greenIcon : blueIcon
            });

            const popupContent = `
        <div class="grid-rows-2 text-center">
          <div class="text-gray-800 text-lg">
            <span class="font-bold">${lang.place}:</span> ${place.name}
          </div>
          <div class="m-1">
            <a href="${locale === 'tr' ? '/tr' : ''}/place/${place.id}" 
               class="text-white bg-gray-300 hover:bg-gray-400 rounded-md text-lg p-2">
              ${lang.placePage}
            </a>
          </div>
        </div>
      `;

            marker.bindPopup(popupContent);
            marker.addTo(layerRef.current!);
        });
    }, [places, visits, locale, lang]);

    return <div className="mx-auto sm:mx-6 h-64 rounded-md" id="placeMap"></div>;
}
