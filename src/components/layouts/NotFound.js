import React from 'react';

const NotFound = ({ lang }) => {
  return (
    <div className='ui container  center aligned'>
      <div className='ui segment'>
        <h1>
          <i className='ui icon exclamation triangle'></i> {lang.title}
        </h1>
        <p>{lang.text}</p>
      </div>
    </div>
  );
};

export default NotFound;
