import React, { useEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useRouter } from 'next/router';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import Link from 'next/link';

const Popup = ({ place, locale, lang }) => {
  return (
    <div className='grid-rows-2 text-center'>
      <div className='text-gray-800 text-lg'>
        <span className='font-bold'>{lang.place}:</span> {place.name}
      </div>
      <div className='m-1'>
        <Link href={`${locale === 'tr' ? '/tr' : ''}/place/${place.id}`}>
          <a className='text-white bg-gray-300 hover:bg-gray-400 rounded-md text-lg p-2'>
            {lang.placePage}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default function Map({ places, lang, visits }) {
  const { locale } = useRouter();

  // create map
  const mapRef = useRef(null);
  useEffect(() => {
    mapRef.current = L.map('placeMap', {
      tap: false,
      zoom: 1,
      minZoom: 1,
      maxZoom: 18,
      maxBounds: [
        [-100, -190],
        [100, 190]
      ],
      center: [30, 30],
      worldCopyJump: true,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });
  }, []);

  // add layer
  const layerRef = useRef(null);
  useEffect(() => {
    layerRef.current = L.layerGroup().addTo(mapRef.current);
  }, []);

  let greenIcon = new L.Icon({
    iconUrl: '/img/marker/marker-green.png',
    shadowUrl: '/img/marker/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  let blueIcon = new L.Icon({
    iconUrl: '/img/marker/marker-blue.png',
    shadowUrl: '/img/marker/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // update markers
  React.useEffect(() => {
    layerRef.current.clearLayers();
    places.forEach(place => {
      let marker;

      if (visits.includes(place.id)) {
        marker = L.marker([place.latitude, place.longitude], {
          icon: greenIcon
        });
      } else {
        marker = L.marker([place.latitude, place.longitude], {
          icon: blueIcon
        });
      }

      marker.bindPopup(
        ReactDOMServer.renderToString(
          <Popup place={place} locale={locale} lang={lang} />
        )
      );

      marker.addTo(layerRef.current);
    });
  }, [places]);

  return <div className='mx-auto sm:mx-6 h-64 rounded-md' id='placeMap'></div>;
}
