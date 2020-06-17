import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function PageTitle({ title, metaContent }) {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={metaContent} />

        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='@lagezla' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={metaContent} />
        <meta
          name='twitter:image'
          content='https://gez.la/static/img/logo.png'
        />
      </Helmet>
    </div>
  );
}
