import React from 'react';

export default function PlaceModal({
  lang,
  place,
  visits,
  clearPlace,
  takeVirtualTour
}) {
  return (
    <div className='modal modal-container is-active'>
      <div className='modal-background' onClick={() => clearPlace()}></div>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>
            {visits.includes(place.id) && (
              <span className='tag is-success'>{lang.visited}</span>
            )}
          </p>
          <button className='delete' onClick={() => clearPlace()}></button>
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

                <div className='column is-size-4 has-text-weight-semibold'>
                  {place.name}
                </div>
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

          <a
            className='button is-success is-rounded is-medium'
            href={place.website}
            target='_blank'
            rel='noopener noreferrer'
          >
            {lang.website}
          </a>
        </footer>
      </div>
    </div>
  );
}
