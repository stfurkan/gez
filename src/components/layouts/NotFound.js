import React from 'react';

const NotFound = ({ lang }) => {
  return (
    <div>
      <section className='section'>
        <div className='container'>
          <div className='content box has-text-centered'>
            <h1>
              <i className='fas fa-exclamation'></i> {lang.title}
            </h1>
            <p>{lang.text}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
