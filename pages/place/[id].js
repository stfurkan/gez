import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Share from '../../components/Share';

import langEn from '../../lang/en/lang.json';
import langTr from '../../lang/tr/lang.json';
import placesEn from '../../lang/en/places.json';
import placesTr from '../../lang/tr/places.json';

export default function Place({ place, lang }) {
  const { asPath, locale } = useRouter();

  const visitPlace = () => {
    if (typeof window !== 'undefined') {
      let visits = JSON.parse(localStorage.getItem('visits'));
      if (!visits.includes(place.id)) {
        visits = [...visits, place.id];
        localStorage.setItem('visits', JSON.stringify(visits));
      }
    }
  };

  return (
    <>
      <Head>
        <meta property='og:title' content={place.name} key='ogtitle' />
        <meta
          property='og:description'
          content={place.description}
          key='ogdesc'
        />
        <title>{place.name} | Gez.la</title>
      </Head>
      <div className='flex flex-row justify-between mx-8 pb-1 text-center'>
        <Link href='/'>
          <button
            type='button'
            className='text-xl bg-red-700 hover:bg-red-900 text-white p-2 rounded inline-flex items-center focus:outline-none'
          >
            <svg
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              viewBox='0 0 24 24'
              className='w-6 h-6'
            >
              <path d='M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z' />
            </svg>
            <span className='font-medium'>{lang.back}</span>
          </button>
        </Link>

        <Share
          lang={lang.share}
          url={`${typeof window !== 'undefined' && window.location.origin}${
            locale === 'tr' ? '/tr' : ''
          }${asPath}`}
          title={`${place.name} ${lang.virtualTour}`}
        />
      </div>

      <div className='bg-white shadow overflow-hidden rounded-lg mx-8'>
        <div className='flex flex-col sm:flex-row sm:justify-between items-center px-3 py-3 border-b border-gray-500 mx-3'>
          <a
            href={place.website}
            target='_blank'
            rel='noopener noreferrer'
            className='text-3xl leading-6 font-bold text-gray-900 hover:text-gray-600 text-center sm:text-left'
          >
            <h1>{place.name}</h1>
          </a>
          <a
            href={place.virtual}
            target='_blank'
            rel='noopener noreferrer'
            className='p-2 mt-3 sm:mt-0 rounded-lg text-2xl bg-blue-600 hover:bg-blue-800 text-white text-center'
            onClick={() => visitPlace()}
          >
            {lang.virtualTour}
          </a>
        </div>
        <div className='flex flex-col px-3 py-3 mx-3'>
          <div className='bg-gray-50 px-4 py-2 items-center sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <div className='text-3xl font-bold'>{lang.type}</div>
            <div className='text-lg sm:mt-0 sm:col-span-2'>
              {lang[place.type]}
            </div>
          </div>
          <div className='bg-gray-50 px-4 py-2 items-center sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <div className='text-3xl font-bold'>{lang.address}</div>
            <div className='text-lg sm:mt-0 sm:col-span-2'>
              {place.state === ''
                ? `${place.city}, ${place.country}`
                : `${place.city}, ${place.state}, ${place.country}`}
            </div>
          </div>
          <div className='bg-gray-50 px-4 py-2 items-center sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <div className='text-3xl font-bold'>{lang.description}</div>
            <div className='text-lg sm:mt-0 sm:col-span-2'>
              {place.description}{' '}
              {place.wikipedia !== '' && (
                <a
                  className='text-xs text-white bg-green-700 hover:bg-green-800 p-1 rounded-md'
                  href={place.wikipedia}
                  target='_blank'
                  rel='noopener noreferrer'
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

export async function getStaticPaths() {
  let places = placesEn;

  let placePaths = [];
  places.forEach(place => {
    placePaths.push({ params: { id: String(place.id) }, locale: 'tr' });
    placePaths.push({ params: { id: String(place.id) }, locale: 'en' });
  });

  return {
    paths: placePaths,
    fallback: false
  };
}

export async function getStaticProps({ locale, params }) {
  let places = locale === 'tr' ? placesTr : placesEn;
  let lang = locale === 'tr' ? langTr.place : langEn.place;

  let place = places.filter(place => String(place.id) === String(params.id))[0];

  places = [...places].sort((a, b) => a.name.localeCompare(b.name));
  return {
    props: {
      place,
      lang
    }
  };
}
