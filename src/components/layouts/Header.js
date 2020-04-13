import React from 'react';
import { Link } from 'react-router-dom';

function Header({ lang }) {
  return (
    <div className='ui container '>
      <div className='ui hidden fitted divider'></div>
      <div className='ui stackable  menu'>
        <div className='item'>
          <Link to='/'>
            <h1 className='ui header site-logo'>
              <i className='shoe prints icon'></i>
              <div className='content'>{lang.siteName}</div>
              <span className='sub header site-logo'>{lang.slogan}</span>
            </h1>
          </Link>
        </div>
        <Link to='/' className='item ui big button header-button'>
          {lang.homepage}
        </Link>
        <div className='right menu'>
          <Link to='/about' className='item ui big button header-button'>
            {lang.about}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
