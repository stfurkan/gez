import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function PageTitle({ title, metaContent }) {
  return (
    <div>
      <Helmet>
        <title>{`${title}`}</title>
        <meta name='description' content={`${metaContent}`} />
      </Helmet>
    </div>
  );
}
