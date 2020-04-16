import React from 'react';

import PageTitle from '../layouts/PageTitle';

export default function About({ lang }) {
  return (
    <section className='section'>
      <PageTitle title={lang.pageTitle} metaContent={lang.metaContent} />

      <div className='container'>
        <div className='box content'>
          <h1 className='is-size-2'>{lang.pageHeader}</h1>

          <p>
            <span className='is-size-5'>{lang.aboutText1}</span>
          </p>
          <p>
            <span className='is-size-5'>{lang.aboutText2}</span>
          </p>
          <p>
            <span className='is-size-6'>
              <b>{lang.developer}:</b>{' '}
              <a
                href='https://www.linkedin.com/in/s-furkan-teke-50758513b'
                target='_blank'
                rel='noopener noreferrer'
              >
                Furkan
              </a>
            </span>
          </p>
          <p>
            <span className='is-size-6'>
              <a
                href='https://github.com/stfurkan/gez'
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className='fab fa-github'></i> GitHub
              </a>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
