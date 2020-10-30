import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import langEn from '../lang/en/lang.json';
import langTr from '../lang/tr/lang.json';

export default function SEO() {
  const { locale } = useRouter();

  const lang = locale === 'tr' ? langTr.seo : langEn.seo;
  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <meta name='description' content={lang.description} />

      <meta name='twitter:card' content='summary_large_image' key='twcard' />
      <meta name='twitter:site' content='@lagezla' key='twhandle' />

      <meta property='og:url' content='https://gez.la' key='ogurl' />
      <meta
        property='og:image'
        content='https://gez.la/gezla.png'
        key='ogimage'
      />
      <meta property='og:site_name' content='Gez.la' key='ogsitename' />
      <meta property='og:title' content={lang.title} key='ogtitle' />
      <meta property='og:description' content={lang.description} key='ogdesc' />
      <title>{lang.title}</title>

      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
}
