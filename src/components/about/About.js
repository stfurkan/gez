import React from 'react';

import PageTitle from '../layouts/PageTitle';

export default function About({ lang }) {
  return (
    <div className='ui container'>
      <PageTitle title={lang.pageTitle} metaContent={lang.metaContent} />
      <br />
      <div>
        <h1 className='ui top attached header'>{lang.pageHeader}</h1>
        <div className='ui attached segment'>
          <div className='ui segment raised'>
            <p>
              <span className='ui big text'>{lang.aboutText1}</span>
            </p>
            <p>
              <span className='ui big text'>{lang.aboutText2}</span>
            </p>
            <p>
              <span className='ui big text'>
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
              <span className='ui large text'>
                <a
                  href='https://github.com/stfurkan'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='github icon'></i> GitHub
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
