import React from 'react';

export default function WelcomeModal({ lang, closeWelcome }) {
  return (
    <div className='modal modal-container is-active'>
      <div className='modal-background' onClick={() => closeWelcome()}></div>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>
            <strong>{lang.welcome.header}</strong>
          </p>
          <button className='delete' onClick={() => closeWelcome()}></button>
        </header>
        <section className='modal-card-body is-marginless'>
          <div className='content has-text-left'>
            <p>{lang.metaContent}</p>
            <p>{lang.welcome.text}</p>
          </div>
        </section>

        <footer className='modal-card-foot'>
          <button
            className='button is-link is-rounded is-large'
            onClick={() => closeWelcome()}
          >
            {lang.welcome.continue} <i className='fas fa-arrow-right'></i>
          </button>
        </footer>
      </div>
    </div>
  );
}
