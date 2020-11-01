import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import langEn from '../lang/en/lang.json';
import langTr from '../lang/tr/lang.json';

export default function Header() {
  const { locale } = useRouter();

  let lang = locale === 'tr' ? langTr.header : langEn.header;

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <header className='bg-gray-800 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3'>
        <div className='flex items-center justify-between px-4 py-3 sm:p-0'>
          <div>
            <Link href='/'>
              <img
                className='h-8 sm:h-10 cursor-pointer'
                src='/logo.svg'
                alt='Gez.la Logo'
              />
            </Link>
          </div>

          <div className='sm:hidden'>
            <button
              type='button'
              className='block text-white hover:text-gray-500 focus:outline-none'
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg className='h-6 w-6 fill-current' viewBox='0 0 24 24'>
                {isOpen ? (
                  <path
                    fillRule='evenodd'
                    d='M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z'
                  />
                ) : (
                  <path
                    fillRule='evenodd'
                    d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } px-2 pt-2 pb-4 text-lg text-white font-semibold sm:flex sm:items-center sm:p-0`}
        >
          <Link href='/'>
            <a className='block px-2 py-1 rounded hover:bg-gray-700'>
              {lang.homepage}
            </a>
          </Link>
          <Link href='/about'>
            <a className='block mt-1 px-2 py-1 rounded hover:bg-gray-700 sm:mt-0 sm:ml-2'>
              {lang.about}
            </a>
          </Link>
          <a
            href='https://www.patreon.com/lagezla'
            target='_blank'
            rel='noopener noreferrer'
            className='block mt-1 px-2 py-1 rounded hover:bg-gray-700 sm:mt-0 sm:ml-2'
          >
            {lang.support}
          </a>
          <div className='inline-flex'>
            <a
              href='https://twitter.com/lagezla'
              target='_blank'
              rel='noopener noreferrer'
              className='block mt-1 ml-1 p-1 rounded hover:bg-gray-700 sm:mt-0'
              aria-label='Twitter'
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
                <path d='M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z' />
              </svg>
            </a>
            <a
              href='https://www.instagram.com/lagezla'
              target='_blank'
              rel='noopener noreferrer'
              className='block mt-1 p-1 rounded hover:bg-gray-700 sm:mt-0 sm:ml-1'
              aria-label='Instagram'
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
                <path d='M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z' />
              </svg>
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}
