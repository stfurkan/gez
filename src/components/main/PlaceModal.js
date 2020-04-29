import React, { useState } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton
} from 'react-share';

const copyUrl = url => {
  navigator.clipboard.writeText(url);
};

export default function PlaceModal({
  lang,
  place,
  visits,
  clearPlace,
  takeVirtualTour
}) {
  const [share, setShare] = useState(false);

  return (
    <div className='modal modal-container is-active'>
      <div className='modal-background' onClick={() => clearPlace()}></div>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <div className='modal-card-title'>
            <div
              className={share ? 'dropdown is-active' : 'dropdown'}
              onMouseOver={() => setShare(true)}
              onMouseLeave={() => setShare(false)}
            >
              <div className='dropdown-trigger'>
                <div className='tag is-info'>
                  <span>{lang.share}</span>
                  <span className='icon is-small'>
                    <i className='fas fa-share-alt'></i>
                  </span>
                </div>
              </div>
              <div className='dropdown-menu'>
                <div className='dropdown-content'>
                  <div className='dropdown-item'>
                    <FacebookShareButton
                      url={`${window.location.origin}?placeId=${place.id}`}
                      quote={`${place.name} ${lang.virtualTour}`}
                      className=''
                    >
                      <div className='button is-rounded'>
                        <span className='icon'>
                          <i className='fab fa-facebook-f'></i>
                        </span>
                        <span>Facebook</span>
                      </div>
                    </FacebookShareButton>
                  </div>
                  <div className='dropdown-item'>
                    <TwitterShareButton
                      url={`${window.location.origin}?placeId=${place.id}`}
                      title={`${place.name} ${lang.virtualTour}`}
                      className=''
                    >
                      <div className='button is-rounded'>
                        <span className='icon'>
                          <i className='fab fa-twitter'></i>
                        </span>
                        <span>Twitter</span>
                      </div>
                    </TwitterShareButton>
                  </div>
                  <div className='dropdown-item'>
                    <LinkedinShareButton
                      url={`${window.location.origin}?placeId=${place.id}`}
                      title={`${place.name} ${lang.virtualTour}`}
                      className=''
                    >
                      <div className='button is-rounded'>
                        <span className='icon'>
                          <i className='fab fa-linkedin-in'></i>
                        </span>
                        <span>LinkedIn</span>
                      </div>
                    </LinkedinShareButton>
                  </div>
                  <div className='dropdown-item'>
                    <WhatsappShareButton
                      url={`${window.location.origin}?placeId=${place.id}`}
                      title={`${place.name} ${lang.virtualTour}`}
                      className=''
                    >
                      <div className='button is-rounded'>
                        <span className='icon'>
                          <i className='fab fa-whatsapp'></i>
                        </span>
                        <span>WhatsApp</span>
                      </div>
                    </WhatsappShareButton>
                  </div>
                  <div className='dropdown-item'>
                    <EmailShareButton
                      url={`${window.location.origin}?placeId=${place.id}`}
                      subject={`${place.name} ${lang.virtualTour}`}
                      body={place.description}
                      className=''
                    >
                      <div className='button is-rounded'>
                        <span className='icon'>
                          <i className='fas fa-envelope'></i>
                        </span>
                        <span>{lang.email}</span>
                      </div>
                    </EmailShareButton>
                  </div>
                  <hr className='dropdown-divider' />
                  <div
                    className='dropdown-item'
                    onClick={() =>
                      copyUrl(`${window.location.origin}?placeId=${place.id}`)
                    }
                  >
                    <div className='button is-rounded'>
                      <span className='icon'>
                        <i className='fas fa-copy'></i>
                      </span>
                      <span>{lang.copyLink}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>{' '}
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
        </footer>
      </div>
    </div>
  );
}
