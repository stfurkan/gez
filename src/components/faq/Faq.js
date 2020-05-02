import React from 'react';

import PageTitle from '../layouts/PageTitle';

export default function Faq({ lang }) {
  return (
    <section className='section'>
      <PageTitle title={lang.pageTitle} metaContent={lang.metaContent} />

      <div className='container'>
        <div className='box content'>
          <h1 className='is-size-2'>{lang.title}</h1>
          <hr />
          <h2 className='is-size-4'>{lang.question1}</h2>
          <p>{lang.answer1}</p>
          <h2 className='is-size-4'>{lang.question2}</h2>
          <p>{lang.answer2}</p>
          <h2 className='is-size-4'>{lang.question3}</h2>
          <p>{lang.answer3}</p>
          <h2 className='is-size-4'>{lang.question4}</h2>
          <p>{lang.answer4}</p>
        </div>
      </div>
    </section>
  );
}
