import React, { useState } from 'react';
import Link from 'next/link';

import sort from '../lib/sort';

export default function Table({
  placeList,
  lang,
  visits,
  setPlaces,
  places,
  sorted,
  setSorted
}) {
  return (
    <div className='flex flex-col'>
      <div className='-my-2 overflow-x-auto'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-6'>
          <div className='shadow overflow-hidden border-b border-gray-200 rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-800'>
                <tr className='cursor-pointer'>
                  <th
                    className='px-2 sm:px-6 py-3 text-left text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider hover:bg-gray-900'
                    onClick={() => {
                      if (sorted === 'name-asc') {
                        setPlaces(sort(places, 'name', 'desc'));
                        setSorted('name-desc');
                      } else {
                        setPlaces(sort(places, 'name', 'asc'));
                        setSorted('name-asc');
                      }
                    }}
                  >
                    <div className='inline-flex'>
                      {lang.name}

                      <svg
                        fill='none'
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        viewBox='0 0 24 24'
                        className='w-4 h-4 ml-1'
                      >
                        {sorted === 'name-asc' && (
                          <path d='M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12' />
                        )}
                        {sorted === 'name-desc' && (
                          <path d='M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4' />
                        )}
                      </svg>
                    </div>
                  </th>
                  <th
                    className='px-2 sm:px-6 py-3 text-left text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider hover:bg-gray-900'
                    onClick={() => {
                      if (sorted === 'type-asc') {
                        setPlaces(sort(places, 'type', 'desc'));
                        setSorted('type-desc');
                      } else {
                        setPlaces(sort(places, 'type', 'asc'));
                        setSorted('type-asc');
                      }
                    }}
                  >
                    <div className='inline-flex'>
                      {lang.type}

                      <svg
                        fill='none'
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        viewBox='0 0 24 24'
                        className='w-4 h-4 ml-1'
                      >
                        {sorted === 'type-asc' && (
                          <path d='M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12' />
                        )}
                        {sorted === 'type-desc' && (
                          <path d='M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4' />
                        )}
                      </svg>
                    </div>
                  </th>
                  <th
                    className='px-2 sm:px-6 py-3 text-left text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider hover:bg-gray-900'
                    onClick={() => {
                      if (sorted === 'country-asc') {
                        setPlaces(sort(places, 'country', 'desc'));
                        setSorted('country-desc');
                      } else {
                        setPlaces(sort(places, 'country', 'asc'));
                        setSorted('country-asc');
                      }
                    }}
                  >
                    <div className='inline-flex'>
                      {lang.country}

                      <svg
                        fill='none'
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        viewBox='0 0 24 24'
                        className='w-4 h-4 ml-1'
                      >
                        {sorted === 'country-asc' && (
                          <path d='M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12' />
                        )}
                        {sorted === 'country-desc' && (
                          <path d='M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4' />
                        )}
                      </svg>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {placeList.map(place => (
                  <Link key={place.id} href={`/place/${place.id}`}>
                    <tr className='hover:bg-gray-200 cursor-pointer'>
                      <td className='px-2 sm:px-6 py-3'>
                        <div className='text-base leading-5 font-medium text-gray-900'>
                          {place.name}{' '}
                          {visits.includes(place.id) && (
                            <span className='inline-block text-xs bg-green-700 text-white p-1 rounded-md'>
                              {lang.visited}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className='px-2 sm:px-6 py-3'>
                        <div className='text-base leading-5 text-gray-900'>
                          {place.type}
                        </div>
                      </td>
                      <td className='px-2 sm:px-6 py-3'>
                        <div className='text-base leading-5 text-gray-900'>
                          {place.country}
                        </div>
                      </td>
                    </tr>
                  </Link>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
