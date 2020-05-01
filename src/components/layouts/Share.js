import React, { useState } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton
} from 'react-share';

const copyUrl = url => {
  if (!navigator.clipboard) {
    let copyInput = document.createElement('input');
    document.body.appendChild(copyInput);
    copyInput.setAttribute('id', 'copyId');
    document.getElementById('copyId').value = url;
    copyInput.select();
    document.execCommand('copy');
    document.body.removeChild(copyInput);
  } else {
    navigator.clipboard.writeText(url);
  }
};

export default function Share({ lang, url, title }) {
  const [share, setShare] = useState(false);
  const [copy, setCopy] = useState(false);

  return (
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
            <FacebookShareButton url={url} quote={title}>
              <div className='button is-rounded'>
                <span className='icon'>
                  <i className='fab fa-facebook-f'></i>
                </span>
                <span>Facebook</span>
              </div>
            </FacebookShareButton>
          </div>
          <div className='dropdown-item'>
            <TwitterShareButton url={url} title={title}>
              <div className='button is-rounded'>
                <span className='icon'>
                  <i className='fab fa-twitter'></i>
                </span>
                <span>Twitter</span>
              </div>
            </TwitterShareButton>
          </div>
          <div className='dropdown-item'>
            <LinkedinShareButton url={url} title={title}>
              <div className='button is-rounded'>
                <span className='icon'>
                  <i className='fab fa-linkedin-in'></i>
                </span>
                <span>LinkedIn</span>
              </div>
            </LinkedinShareButton>
          </div>
          <div className='dropdown-item'>
            <WhatsappShareButton url={url} title={title}>
              <div className='button is-rounded'>
                <span className='icon'>
                  <i className='fab fa-whatsapp'></i>
                </span>
                <span>WhatsApp</span>
              </div>
            </WhatsappShareButton>
          </div>
          <div className='dropdown-item'>
            <EmailShareButton url={url} subject={title}>
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
              copyUrl(url) ||
              setCopy(true) ||
              setTimeout(() => {
                setCopy(false);
              }, 3000)
            }
          >
            <div className='button is-rounded'>
              <span className='icon'>
                <i className='fas fa-copy'></i>
              </span>
              <span>{lang.copyLink}</span>
            </div>
            {copy && (
              <div className='has-text-centered'>
                <div className='tag is-success'>{lang.copyLinkSuccess}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
