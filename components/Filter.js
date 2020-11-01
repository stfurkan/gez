import React, { useState, useEffect } from 'react';

import sort from '../lib/sort';

export default function Filter({ places, setFilteredPlaces, lang, sorted }) {
  let countries = [];
  places.forEach(place => {
    if (!countries.includes(place.country)) {
      countries.push(place.country);
    }
  });
  countries.sort((a, b) => a.localeCompare(b));

  let types = [];
  places.forEach(place => {
    if (!types.includes(place.type)) {
      types.push(place.type);
    }
  });
  types.sort((a, b) => a.localeCompare(b));

  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [country, setCountry] = useState('all');

  useEffect(() => {
    setSearch('');
    setType('all');
    setCountry('all');
  }, [places]);

  useEffect(() => {
    let filteredPlaces = [...places];

    filteredPlaces = sort(
      filteredPlaces,
      sorted.split('-')[0],
      sorted.split('-')[1]
    );

    if (search !== '') {
      filteredPlaces = filteredPlaces.filter(place =>
        place.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    }

    if (type !== 'all') {
      filteredPlaces = filteredPlaces.filter(place => place.type === type);
    }

    if (country !== 'all') {
      filteredPlaces = filteredPlaces.filter(
        place => place.country === country
      );
    }

    setFilteredPlaces(filteredPlaces);
  }, [search, type, country]);

  return (
    <>
      <div className='flex flex-col'>
        <div className='overflow-x-auto'>
          <div className='align-middle inline-block min-w-full sm:px-6 lg:px-6'>
            <div className='justify-center flex flex-col sm:flex-col md:flex-row items-center sm:items-center md:items-end md:h-12 border-2 rounded-lg border-gray-300'>
              <div className='w-full h-12'>
                <div className='relative h-12 text-gray-600 focus-within:text-gray-400'>
                  <div className='absolute inset-y-0 right-0 flex items-center pl-2'>
                    <span className='p-1'>
                      <svg
                        fill='none'
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        viewBox='0 0 24 24'
                        className='w-6 h-6'
                      >
                        <path d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                      </svg>
                    </span>
                  </div>
                  <span className='absolute inset-y-25 left-0 flex items-center pl-2 text-gray-900'>
                    <label
                      htmlFor='search'
                      className='text-xs font-medium focus:outline-none focus:shadow-outline'
                    >
                      {lang.search}
                    </label>
                  </span>
                  <input
                    type='text'
                    name='search'
                    className='w-full h-12 pb-2 pt-3 text-md bg-gray-100 rounded-md pl-2 pr-10 focus:outline-none focus:bg-gray-200 text-gray-900'
                    aria-label={lang.search}
                    placeholder={lang.searchPlace}
                    autoComplete='off'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className='w-full h-12'>
                <div className='relative h-12 text-gray-600 focus-within:text-gray-400'>
                  <div className='absolute inset-y-0 left-0 flex items-center pt-2'>
                    <span className='p-1'>
                      <svg
                        fill='none'
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        viewBox='0 0 24 24'
                        className='w-5 h-5'
                      >
                        <path d='M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z'></path>
                      </svg>
                    </span>
                  </div>
                  <span className='absolute inset-y-25 left-0 flex items-center pl-2 text-gray-900'>
                    <label
                      htmlFor='type'
                      className='text-xs font-medium focus:outline-none focus:shadow-outline'
                    >
                      {lang.type}
                    </label>
                  </span>
                  <select
                    name='type'
                    className='w-full h-12 form-select pb-2 pt-3 text-md bg-gray-100 rounded-md pl-6 focus:outline-none focus:bg-gray-200 focus:text-gray-900'
                    aria-label={lang.type}
                    value={type}
                    onChange={e => setType(e.target.value)}
                  >
                    <option value='all'>{lang.allTypes}</option>
                    {types.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='w-full h-12'>
                <div className='relative h-12 text-gray-600 focus-within:text-gray-400'>
                  <div className='absolute inset-y-0 left-0 flex items-center pt-2'>
                    <span className='p-1'>
                      <svg
                        fill='none'
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        viewBox='0 0 24 24'
                        className='w-5 h-5'
                      >
                        <path d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                      </svg>
                    </span>
                  </div>
                  <span className='absolute inset-y-25 left-0 flex items-center pl-2 text-gray-900'>
                    <label
                      htmlFor='country'
                      className='text-xs font-medium focus:outline-none focus:shadow-outline'
                    >
                      {lang.country}
                    </label>
                  </span>
                  <select
                    name='country'
                    className='w-full h-12 form-select pb-2 pt-3 text-md bg-gray-100 rounded-md pl-6 focus:outline-none focus:bg-gray-200 focus:text-gray-900'
                    aria-label={lang.country}
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                  >
                    <option value='all'>{lang.allCountries}</option>
                    {countries.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {(search !== '' || type !== 'all' || country !== 'all') && (
                <div className='w-full h-12'>
                  <div className='relative h-12 text-gray-600 focus-within:text-gray-400'>
                    <button
                      type='button'
                      className='w-full h-12 bg-red-700 hover:bg-red-500 text-white font-bold pb-2 pt-3 rounded-md inline-flex justify-center items-center'
                      onClick={() => {
                        setSearch('');
                        setType('all');
                        setCountry('all');
                      }}
                    >
                      <svg
                        fill='none'
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        viewBox='0 0 24 24'
                        className='w-5 h-5'
                      >
                        <path d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                      </svg>
                      <span>{lang.clearFilter}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
