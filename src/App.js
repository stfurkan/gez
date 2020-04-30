import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import NotFound from './components/layouts/NotFound';

import Main from './components/main/Main';
import Faq from './components/faq/Faq';
import About from './components/about/About';

import 'bulma/css/bulma.css';
import './main.css';

let places;
let lang;
if (navigator.language === 'tr' || navigator.language === 'tr-TR') {
  places = require('./lang/tr/places.json');
  lang = require('./lang/tr/lang.json');
} else {
  places = require('./lang/en/places.json');
  lang = require('./lang/en/lang.json');
}

function App() {
  if (localStorage.getItem('visits') === null) {
    localStorage.setItem('visits', JSON.stringify([]));
  }

  if (localStorage.getItem('favorites') === null) {
    localStorage.setItem('favorites', JSON.stringify([]));
  }

  return (
    <HelmetProvider>
      <Router>
        <div className='body-content'>
          <Header lang={lang.header} />
          <div className='main-content'>
            <Switch>
              <Route
                exact
                path='/'
                component={props => (
                  <Main {...props} places={places} lang={lang.main} />
                )}
              />

              <Route
                exact
                path='/favorites'
                component={props => (
                  <Main {...props} places={places} lang={lang.main} />
                )}
              />

              <Route
                exact
                path='/share'
                component={props => (
                  <Main {...props} places={places} lang={lang.main} />
                )}
              />

              <Route
                exact
                path='/faq'
                component={() => <Faq lang={lang.faq} />}
              />

              <Route
                exact
                path='/about'
                component={() => <About lang={lang.about} />}
              />

              <Route component={() => <NotFound lang={lang.notFound} />} />
            </Switch>
          </div>
          <Footer lang={lang.footer} />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
