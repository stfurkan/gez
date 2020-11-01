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
      className='relative inline-block text-left'
      onMouseOver={() => setShare(true)}
      onMouseLeave={() => setShare(false)}
    >
      <div>
        <span className='rounded-md shadow-sm'>
          <button
            type='button'
            className='text-xl font-medium bg-green-700 text-white p-2 rounded inline-flex items-center focus:outline-none transition ease-in-out duration-150'
            id='share-menu'
          >
            <svg
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              viewBox='0 0 24 24'
              className='w-6 h-6'
            >
              <path d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z' />
            </svg>
            {lang.share}
          </button>
        </span>
      </div>

      <div
        className={`${
          !share ? 'hidden' : 'block'
        } origin-top-right absolute right-0  w-56 rounded-md shadow-lg text-center`}
      >
        <div
          className='rounded-md bg-white shadow-xs'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='share-menu'
        >
          <div className='py-1'>
            <div
              className='block px-2 py-1 text-sm leading-5 text-gray-700'
              role='menuitem'
            >
              <FacebookShareButton url={url} quote={title}>
                <div className='text-xl border-solid border-gray-300 rounded-md hover:bg-gray-300 p-2 inline-flex'>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                    className='w-6 h-6'
                  >
                    <path d='M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z' />
                  </svg>
                  <span>Facebook</span>
                </div>
              </FacebookShareButton>
            </div>
            <div
              className='block px-2 py-1 text-sm leading-5 text-gray-700'
              role='menuitem'
            >
              <TwitterShareButton url={url} title={title}>
                <div className='text-xl border-solid border-gray-300 rounded-md hover:bg-gray-300 p-2 inline-flex'>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                    className='w-6 h-6'
                  >
                    <path d='M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z' />
                  </svg>
                  <span>Twitter</span>
                </div>
              </TwitterShareButton>
            </div>
          </div>
          <div
            className='block px-2 py-1 text-sm leading-5 text-gray-700'
            role='menuitem'
          >
            <LinkedinShareButton url={url} title={title}>
              <div className='text-xl border-solid border-gray-300 rounded-md hover:bg-gray-300 p-2 inline-flex'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  className='w-6 h-6'
                >
                  <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                </svg>
                <span>LinkedIn</span>
              </div>
            </LinkedinShareButton>
          </div>
          <div
            className='block px-2 py-1 text-sm leading-5 text-gray-700'
            role='menuitem'
          >
            <WhatsappShareButton url={url} title={title}>
              <div className='text-xl border-solid border-gray-300 rounded-md hover:bg-gray-300 p-2 inline-flex'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  className='w-6 h-6'
                >
                  <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' />
                </svg>
                <span>WhatsApp</span>
              </div>
            </WhatsappShareButton>
          </div>
          <div className='border-t border-gray-100'></div>

          <div
            className='block px-2 py-1 text-sm leading-5 text-gray-700'
            role='menuitem'
          >
            <EmailShareButton url={url} subject={title}>
              <div className='text-xl border-solid border-gray-300 rounded-md hover:bg-gray-300 p-2 inline-flex'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  className='w-6 h-6'
                >
                  <path d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                </svg>
                <span>{lang.email}</span>
              </div>
            </EmailShareButton>
          </div>
          <div className='border-t border-gray-300'></div>
          <div className='py-1'>
            <div
              className='block px-2 py-1 text-sm leading-5 text-gray-700'
              role='menuitem'
            >
              <button
                className='text-xl border-solid border-gray-300 rounded-md hover:bg-gray-300 p-2 inline-flex'
                onClick={() =>
                  copyUrl(url) ||
                  setCopy(true) ||
                  setTimeout(() => {
                    setCopy(false);
                  }, 3000)
                }
              >
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  className='w-6 h-6'
                >
                  <path d='M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3' />
                </svg>
                <span>{lang.copyLink}</span>
              </button>
              {copy && <div>{lang.copyLinkSuccess}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
