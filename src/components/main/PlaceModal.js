import React from 'react';

import Share from '../layouts/Share';

export default function PlaceModal({
  lang,
  place,
  visits,
  favorites,
  clearPlace,
  takeVirtualTour,
  addFavorite,
  removeFavorite
}) {
  return (
    <div className='modal modal-container is-active'>
      <div className='modal-background' onClick={() => clearPlace()}></div>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <div className='modal-card-title'>
            <Share
              lang={lang}
              url={`${window.location.origin}?placeId=${place.id}`}
              title={`${place.name} ${lang.virtualTour}`}
            />{' '}
            {visits.includes(place.id) && (
              <span className='tag is-success'>{lang.visited}</span>
            )}
          </div>
          <button
            className='delete is-large'
            onClick={() => clearPlace()}
          ></button>
        </header>
        <section className='modal-card-body is-marginless'>
          <div className='content has-text-left'>
            <div className='box is-marginless'>
              <div className='columns is-gapless'>
                <div className='column is-one-quarter'>
                  <span className='tag is-info is-light is-large'>
                    {lang.name}
                  </span>
                </div>

                <a
                  className='column is-size-4 has-text-weight-semibold'
                  href={place.website}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {place.name}
                </a>
              </div>
            </div>

            <div className='box is-marginless'>
              <div className='columns is-gapless'>
                <div className='column is-one-quarter'>
                  <span className='tag is-info is-light is-large'>
                    {lang.type}
                  </span>
                </div>

                <div className='column is-size-4 has-text-weight-semibold'>
                  {lang[place.type]}
                </div>
              </div>
            </div>

            <div className='box is-marginless'>
              <div className='columns is-gapless'>
                <div className='column is-one-quarter'>
                  <span className='tag is-info is-light is-large'>
                    {lang.address}
                  </span>
                </div>

                <div className='column is-size-4 has-text-weight-semibold'>
                  {place.state === ''
                    ? `${place.city}, ${place.country}`
                    : `${place.city}, ${place.state}, ${place.country}`}
                </div>
              </div>
            </div>

            <div className='box is-marginless'>
              <div className='columns is-gapless'>
                <div className='column is-one-quarter'>
                  <span className='tag is-info is-light is-large'>
                    {lang.description}
                  </span>
                </div>

                <div className='column'>
                  <div className='content'>
                    {place.description}{' '}
                    {place.wikipedia !== '' && (
                      <a
                        className='tag is-small is-primary'
                        href={place.wikipedia}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {lang.wikipedia}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className='modal-card-foot'>
          <a
            className='button is-link is-rounded is-large'
            href={place.virtual}
            target='_blank'
            rel='noopener noreferrer'
            onClick={() => takeVirtualTour(place.id)}
          >
            {lang.virtualTour}
          </a>

          {favorites.includes(place.id) ? (
            <div
              className='tag is-warning favorite-button'
              onClick={() => removeFavorite(place.id)}
            >
              <span className='icon'>
                <i className='fas fa-heart'></i>
              </span>
              <span>{lang.unlike}</span>
            </div>
          ) : (
            <div
              className='tag is-warning favorite-button'
              onClick={() => addFavorite(place.id)}
            >
              <span className='icon'>
                <i className='far fa-heart'></i>
              </span>
              <span>{lang.like}</span>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}
