import React from 'react';
import { Link } from 'react-router-dom';

function Footer({ lang }) {
  return (
    <div>
      <hr />
      <footer className='footer is-paddingless'>
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
              href='https://www.github.com/stfurkan'
              target='_blank'
              rel='noopener noreferrer'
            >
              GitHub
            </a>
          </p>
          <p>{lang.text}</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
