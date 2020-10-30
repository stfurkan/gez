import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Filter from '../components/Filter';
import Table from '../components/Table';
import Pagination from '../components/Pagination';

import langEn from '../lang/en/lang.json';
import langTr from '../lang/tr/lang.json';
import placesEn from '../lang/en/places.json';
import placesTr from '../lang/tr/places.json';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home({ places, lang }) {
  const [pageElements, setPageElements] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState(places);
  const [sorted, setSorted] = useState('name-asc');

  useEffect(() => {
    setFilteredPlaces(places);
  }, [places]);

  let visits = [];
  if (typeof window !== 'undefined') {
    visits = JSON.parse(localStorage.getItem('visits'));
  }

  return (
    <div>
      <Head>
        <meta property='og:title' content={lang.pageTitle} key='ogtitle' />
        <meta
          property='og:description'
          content={lang.pageDescription}
          key='ogdesc'
        />
        <title>{lang.pageTitle}</title>
      </Head>

      <main className='px-2 sm:px-8'>
        <div className='text-lg sm:text-xl text-center pb-2'>
          <span className='font-medium'>{lang.visitedPlaces}:</span>{' '}
          {visits.length} <span className='font-medium'>/</span>{' '}
          <span className='font-medium'>{lang.totalPlaces}:</span>{' '}
          {places.length}
        </div>
        <Filter
          places={places}
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
          <div className='bg-white font-medium text-xl text-center mx-auto sm:mx-6 mt-3 p-5 rounded-md shadow-lg'>
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

export async function getStaticProps({ locale }) {
  let places = locale === 'tr' ? placesTr : placesEn;
  let lang = locale === 'tr' ? langTr.main : langEn.main;

  places = places.map(place => {
    return {
      id: place.id,
      type: lang[place.type],
      name: place.name,
      country: place.country,
      latitude: place.latitude,
      longitude: place.longitude
    };
  });

  places = [...places].sort((a, b) => a.name.localeCompare(b.name));

  return {
    props: {
      places,
      lang
    }
  };
}
