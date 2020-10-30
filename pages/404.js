import React from 'react';
import Head from 'next/head';

import langEn from '../lang/en/lang.json';
import langTr from '../lang/tr/lang.json';

export default function Error404({ lang }) {
  return (
    <>
      <Head>
        <meta property='og:title' content={lang.title} key='ogtitle' />
        <meta property='og:description' content={lang.desc} key='ogdesc' />
        <title>{lang.title} | Gez.la</title>
      </Head>
      <div className='bg-white text-center shadow overflow-hidden rounded-lg mx-8'>
        <div className='px-3 py-3 border-b border-gray-500 mx-3'>
          <h2 className='text-4xl leading-10 font-bold text-gray-900'>
            {lang.title}
          </h2>
        </div>
        <div className='bg-gray-50 px-4 py-5 grid grid-cols-1 gap-4 px-6'>
          <span className='text-lg leading-5 font-medium text-gray-900'>
            {lang.desc}
          </span>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  let lang = locale === 'tr' ? langTr.notFound : langEn.notFound;

  return {
    props: {
      lang
    }
  };
}
