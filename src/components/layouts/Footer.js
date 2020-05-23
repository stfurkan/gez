import React from 'react';
import { Link } from 'react-router-dom';

function Footer({ lang }) {
  return (
    <div>
      <hr />
      <footer className='footer is-paddingless has-background-warning'>
        <div className='content has-text-centered'>
          <div>
            <Link className='item' to='/'>
              <span className='icon is-medium'>
                <i className='fas fa-lg fa-home'></i>
              </span>
            </Link>{' '}
            <Link className='item' to='/about'>
              <span className='icon is-medium'>
                <i className='fas fa-lg fa-info-circle'></i>
              </span>
            </Link>{' '}
            <a
              className='item'
              href='https://github.com/stfurkan/gez'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='icon is-medium'>
                <i className='fab fa-lg fa-github'></i>
              </span>
            </a>{' '}
            <a
              className='item'
              href='https://twitter.com/lagezla'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='icon is-medium'>
                <i className='fab fa-lg fa-twitter'></i>
              </span>
            </a>{' '}
            <a
              className='item'
              href='https://www.instagram.com/lagezla'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='icon is-medium'>
                <i className='fab fa-lg fa-instagram'></i>
              </span>
            </a>
          </div>
          <Credit />
          <div className='has-text-weight-medium'>{lang.text}</div>
        </div>
      </footer>
    </div>
  );
}

const Credit = () => {
  return navigator.language === 'tr' || navigator.language === 'tr-TR' ? (
    <div className='has-text-weight-medium is-size-7'>
      <a
        href='https://www.linkedin.com/in/stfurkan'
        target='_blank'
        rel='noopener noreferrer'
      >
        Furkan Teke
      </a>{' '}
      tarafından geliştirilmiştir.
    </div>
  ) : (
    <div className='has-text-weight-medium is-size-7'>
      Developed by{' '}
      <a
        href='https://www.linkedin.com/in/stfurkan'
        target='_blank'
        rel='noopener noreferrer'
      >
        Furkan Teke
      </a>
    </div>
  );
};

export default Footer;
