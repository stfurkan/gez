import React from 'react';
import { Link } from 'react-router-dom';

function Footer({ lang }) {
  return (
    <div className='ui vertical footer segment'>
      <div className='ui center aligned container'>
        <div className='ui section divider'></div>

        <div className='ui horizontal small divided link list'>
          <Link className='item' to='/'>
            {lang.homepage}
          </Link>
          <Link className='item' to='/about'>
            {lang.about}
          </Link>
          <a
            className='item'
            href='https://www.github.com/stfurkan'
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='github icon'></i>GitHub
          </a>
        </div>
        <div>{lang.text}</div>
      </div>
    </div>
  );
}

export default Footer;
