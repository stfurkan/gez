import React from 'react';
import { Link } from 'react-router-dom';

function Footer({ lang }) {
  return (
    <div>
      <hr />
      <footer className='footer is-paddingless has-background-warning'>
        <div className='content has-text-centered'>
          <p>
            <Link className='item' to='/'>
              {lang.homepage}
            </Link>{' '}
            |{' '}
            <Link className='item' to='/about'>
              {lang.about}
            </Link>{' '}
            |{' '}
            <a
              className='item'
              href='https://github.com/stfurkan/gez'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='fab fa-github'></i> GitHub
            </a>{' '}
            |{' '}
            <a
              className='item'
              href='https://twitter.com/lagezla'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='fab fa-twitter'></i> Twitter
            </a>{' '}
            |{' '}
            <a
              className='item'
              href='https://www.instagram.com/lagezla'
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='fab fa-instagram'></i> Instagram
            </a>
          </p>
          <p>{lang.text}</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
