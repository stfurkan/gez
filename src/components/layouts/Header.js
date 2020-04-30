import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: false
    };
  }

  render() {
    const { lang } = this.props;
    const { menu } = this.state;

    return (
      <div>
        <nav
          className='navbar is-warning'
          role='navigation'
          aria-label='main navigation'
        >
          <div className='navbar-brand'>
            <Link className='navbar-item' to='/'>
              <img
                src='/static/img/logo.png'
                alt='logo'
                width='112'
                height='28'
              />
            </Link>

            <div
              role='button'
              className={
                menu ? 'navbar-burger burger is-active' : 'navbar-burger burger'
              }
              aria-label='menu'
              aria-expanded='false'
              onClick={() => this.setState({ menu: !menu })}
            >
              <span aria-hidden='true'></span>
              <span aria-hidden='true'></span>
              <span aria-hidden='true'></span>
            </div>
          </div>

          <div className={menu ? 'navbar-menu is-active' : 'navbar-menu'}>
            <div className='navbar-start'>
              <Link to='/' className='navbar-item is-hidden-desktop'>
                <i className='fas fa-home'></i> {lang.homepage}
              </Link>
              <Link to='/favorites' className='navbar-item is-hidden-desktop'>
                <i className='fas fa-heart'></i> {lang.favorites}
              </Link>

              <div className='buttons navbar-item is-hidden-touch'>
                <Link to='/' className='button is-primary'>
                  <strong>
                    <i className='fas fa-home'></i> {lang.homepage}
                  </strong>
                </Link>
                <Link to='/favorites' className='button is-primary'>
                  <strong>
                    <i className='fas fa-heart'></i> {lang.favorites}
                  </strong>
                </Link>
              </div>
            </div>

            <div className='navbar-end'>
              <Link to='/faq' className='navbar-item is-hidden-desktop'>
                <i className='fas fa-question'></i> {lang.faq}
              </Link>
              <Link to='/about' className='navbar-item is-hidden-desktop'>
                <i className='fas fa-info-circle'></i> {lang.about}
              </Link>

              <div className='buttons navbar-item is-hidden-touch'>
                <Link to='/faq' className='button is-success'>
                  <strong>
                    <i className='fas fa-question'></i> {lang.faq}
                  </strong>
                </Link>
                <Link to='/about' className='button is-info'>
                  <strong>
                    <i className='fas fa-info-circle'></i> {lang.about}
                  </strong>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
