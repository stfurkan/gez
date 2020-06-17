import React, { Component, Fragment } from 'react';

import PageTitle from '../layouts/PageTitle';
import Pagination from '../layouts/Pagination';
import Share from '../layouts/Share';
import Map from './Map';
import PlaceModal from './PlaceModal';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.placeRef = React.createRef();

    const { places, location, history } = props;

    let favoritePlaces = [];
    if (location.pathname === '/favorites') {
      let favoriteIds = JSON.parse(localStorage.getItem('favorites'));
      favoritePlaces = [...places].filter(place =>
        favoriteIds.includes(place.id)
      );
    }

    if (location.pathname === '/share') {
      let searchParams = new URLSearchParams(this.props.location.search);

      if (searchParams.get('placeIds')) {
        let placeIds = JSON.parse(searchParams.get('placeIds'));
        favoritePlaces = [...places].filter(place =>
          placeIds.includes(place.id)
        );
      }

      if (favoritePlaces.length === 0) {
        history.push('/');
      }
    }

    this.state = {
      places:
        location.pathname === '/favorites' || location.pathname === '/share'
          ? [...favoritePlaces]
          : [...places],
      pageList:
        location.pathname === '/favorites' || location.pathname === '/share'
          ? [...favoritePlaces]
          : [...places],
      pageOfItems: [],
      selectCountry: 'all',
      selectType: 'all',
      searchPlace: '',
      place: '',
      sorted: '',
      visits: JSON.parse(localStorage.getItem('visits')),
      favorites: JSON.parse(localStorage.getItem('favorites'))
    };
  }

  onChangePage = pageOfItems => {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  };

  onChangeElem = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  clearFilter = () => {
    this.setState({
      searchPlace: '',
      selectCountry: 'all',
      selectType: 'all'
    });
  };

  selectPlace = id => {
    let place = [...this.state.places].filter(place => place.id === id);
    this.setState({
      place: place[0]
    });

    this.props.history.push(`?placeId=${id}`);
  };

  takeVirtualTour = id => {
    if (!this.state.visits.includes(id)) {
      this.setState(
        {
          visits: [...this.state.visits, id]
        },
        () => {
          localStorage.setItem('visits', JSON.stringify(this.state.visits));
          this.setState({
            updateMap: !this.state.updateMap
          });
        }
      );
    }
  };

  addFavorite = id => {
    if (!this.state.favorites.includes(id)) {
      this.setState(
        {
          favorites: [...this.state.favorites, id]
        },
        () => {
          localStorage.setItem(
            'favorites',
            JSON.stringify(this.state.favorites)
          );
        }
      );
    }
  };

  removeFavorite = id => {
    if (this.state.favorites.includes(id)) {
      this.setState(
        {
          favorites: [...this.state.favorites].filter(placeId => placeId !== id)
        },
        () => {
          localStorage.setItem(
            'favorites',
            JSON.stringify(this.state.favorites)
          );
        }
      );
    }
  };

  sortTable = sortItem => {
    const { pageList } = this.state;
    const { lang } = this.props;

    let sortedItems = [...pageList];

    // Sort by name ascending
    if (sortItem === 'nameAsc') {
      sortedItems = [...sortedItems].sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      this.setState({
        sorted: 'nameAsc',
        pageList: [...sortedItems]
      });
    }

    // Sort by name descending
    if (sortItem === 'nameDesc') {
      sortedItems = [...sortedItems].sort((a, b) =>
        b.name.localeCompare(a.name)
      );

      this.setState({
        sorted: 'nameDesc',
        pageList: [...sortedItems]
      });
    }

    // Sort by type ascending
    if (sortItem === 'typeAsc') {
      sortedItems = [...sortedItems].sort((a, b) =>
        lang[a.type].localeCompare(lang[b.type])
      );

      this.setState({
        sorted: 'typeAsc',
        pageList: [...sortedItems]
      });
    }

    // Sort by type descending
    if (sortItem === 'typeDesc') {
      sortedItems = [...sortedItems].sort((a, b) =>
        lang[b.type].localeCompare(lang[a.type])
      );

      this.setState({
        sorted: 'typeDesc',
        pageList: [...sortedItems]
      });
    }

    // Sort by country ascending
    if (sortItem === 'countryAsc') {
      sortedItems = [...sortedItems].sort((a, b) =>
        a.country.localeCompare(b.country)
      );

      this.setState({
        sorted: 'countryAsc',
        pageList: [...sortedItems]
      });
    }

    // Sort by country descending
    if (sortItem === 'countryDesc') {
      sortedItems = [...sortedItems].sort((a, b) =>
        b.country.localeCompare(a.country)
      );

      this.setState({
        sorted: 'countryDesc',
        pageList: [...sortedItems]
      });
    }
  };

  clearPlace = () => {
    this.setState({ place: '' });

    this.props.history.push(this.props.location.pathname);
  };

  componentDidMount() {
    const { location } = this.props;
    const { places } = this.state;

    this.sortTable('nameAsc');

    let searchParams = new URLSearchParams(location.search);

    if (searchParams.get('placeId')) {
      let placeId = parseInt(searchParams.get('placeId'));
      let place = [...places].filter(place => place.id === placeId);

      if (place.length === 1) {
        this.setState({
          place: place[0]
        });
      }
    }
  }

  componentDidUpdate = (pp, ps) => {
    if (
      ps.searchPlace !== this.state.searchPlace ||
      ps.selectCountry !== this.state.selectCountry ||
      ps.selectType !== this.state.selectType
    ) {
      let filteredList = [...this.state.places];

      if (!(this.state.searchPlace === '')) {
        filteredList = filteredList.filter(place =>
          place.name
            .toLowerCase()
            .includes(this.state.searchPlace.toLowerCase())
        );
      }

      if (!(this.state.selectCountry === 'all')) {
        filteredList = filteredList.filter(
          place => place.country === this.state.selectCountry
        );
      }

      if (!(this.state.selectType === 'all')) {
        filteredList = filteredList.filter(
          place => place.type === this.state.selectType
        );
      }

      this.setState(
        {
          pageList: filteredList
        },
        () => {
          this.sortTable(this.state.sorted);
        }
      );
    }

    if (
      ps.favorites !== this.state.favorites &&
      this.props.location.pathname === '/favorites'
    ) {
      let favoritePlaces = [];
      favoritePlaces = [...this.props.places].filter(place =>
        this.state.favorites.includes(place.id)
      );

      this.setState({
        places: [...favoritePlaces],
        pageList: [...favoritePlaces]
      });
    }
  };

  render() {
    const { lang, location } = this.props;
    const {
      places,
      place,
      pageList,
      pageOfItems,
      searchPlace,
      selectCountry,
      selectType,
      visits,
      favorites,
      sorted
    } = this.state;

    let countries = [];
    places.forEach(place => {
      if (!countries.includes(place.country)) {
        countries.push(place.country);
      }
    });
    countries.sort((a, b) => a.localeCompare(b));

    let types = [];
    places.forEach(place => {
      if (!types.includes(place.type)) {
        types.push(place.type);
      }
    });
    types.sort((a, b) => lang[a].localeCompare(lang[b]));

    let shareFavoriteUrl = `${
      window.location.origin
    }/share?placeIds=${localStorage.getItem('favorites')}`;

    return (
      <div>
        {location.pathname === '/favorites' ? (
          <PageTitle
            title={
              place === '' ? lang.favorites.pageTitle : `Gez.la | ${place.name}`
            }
            metaContent={place === '' ? lang.metaContent : place.description}
          />
        ) : (
          <PageTitle
            title={place === '' ? lang.pageTitle : `Gez.la | ${place.name}`}
            metaContent={place === '' ? lang.metaContent : place.description}
          />
        )}

        {location.pathname === '/favorites' && places.length === 0 ? (
          <section className='section'>
            <div className='container'>
              <div className='box has-text-centered is-family-monospace'>
                <h2 className='is-size-3'>
                  <i className='fas fa-exclamation'></i>{' '}
                  {lang.favorites.warningTitle}
                </h2>
                <span className='is-size-6'>{lang.favorites.warningText}</span>
              </div>
            </div>
          </section>
        ) : (
          <Fragment>
            <section className='section is-paddingless'>
              <div className='container'>
                {location.pathname === '/favorites' ? (
                  <div className='notification has-text-centered is-family-monospace is-paddingless is-marginless'>
                    <h2 className='is-size-3'>{lang.favorites.title} </h2>
                    <span className='is-size-6'>
                      <Share
                        lang={lang}
                        url={shareFavoriteUrl}
                        title={`${lang.pageTitle.split('|')[0]} ${
                          lang.virtualTour
                        }`}
                      />{' '}
                      {lang.favorites.totalFavorite}: {places.length}
                    </span>
                  </div>
                ) : (
                  location.pathname === '/' && (
                    <div className='notification is-light has-text-centered has-text-weight-semibold is-italic is-family-monospace is-size-5 is-size-6-mobile is-paddingless'>
                      {lang.visitedPlaces}: <strong>{visits.length}</strong> /{' '}
                      {lang.totalPlaces}: <strong>{places.length}</strong>
                    </div>
                  )
                )}
              </div>
            </section>

            <section className='section is-paddingless has-background-light'>
              <div className='container'>
                <div className='columns is-gapless'>
                  <div className='column'>
                    <div className='field'>
                      <p className='control has-icons-right'>
                        <input
                          className='input is-expanded'
                          type='text'
                          placeholder={lang.searchPlace}
                          name='searchPlace'
                          value={searchPlace}
                          onChange={this.onChangeElem}
                        />
                        <span className='icon is-small is-right'>
                          <i className='fas fa-search'></i>
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className='column'>
                    <div className='field'>
                      <p className='control has-icons-left'>
                        <span className='select is-fullwidth'>
                          <select
                            value={selectCountry}
                            name='selectCountry'
                            onChange={this.onChangeElem}
                          >
                            <option value='all'>{lang.allCountries}</option>
                            {countries.map(country => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))}
                          </select>
                        </span>
                        <span className='icon is-small is-left'>
                          <i className='fas fa-globe'></i>
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className='column'>
                    <div className='field'>
                      <p className='control has-icons-left'>
                        <span className='select is-fullwidth'>
                          <select
                            value={selectType}
                            name='selectType'
                            onChange={this.onChangeElem}
                          >
                            <option value='all'>{lang.allTypes}</option>
                            {types.map(type => (
                              <option key={type} value={type}>
                                {lang[type]}
                              </option>
                            ))}
                          </select>
                        </span>
                        <span className='icon is-small is-left'>
                          <i className='fas fa-feather-alt'></i>
                        </span>
                      </p>
                    </div>
                  </div>

                  <div
                    className={
                      searchPlace === '' &&
                      selectCountry === 'all' &&
                      selectType === 'all'
                        ? 'is-hidden'
                        : 'column'
                    }
                  >
                    <div
                      className='button is-danger is-fullwidth'
                      onClick={() => this.clearFilter()}
                    >
                      <i className='fas fa-trash'></i> {lang.clearFilter}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className='section is-paddingless'>
              <div className='container'>
                <Map
                  places={pageList}
                  selectPlace={this.selectPlace}
                  lang={lang.map}
                  visits={visits}
                />
              </div>

              <div className='container'>
                <table className='table is-hoverable is-fullwidth is-narrow is-bordered'>
                  <thead>
                    <tr>
                      <th
                        className='table-header'
                        onClick={() =>
                          sorted === 'nameAsc'
                            ? this.sortTable('nameDesc')
                            : this.sortTable('nameAsc')
                        }
                      >
                        {lang.name}{' '}
                        {sorted === 'nameAsc' ? (
                          <i className='fas fa-sort-alpha-down'></i>
                        ) : sorted === 'nameDesc' ? (
                          <i className='fas fa-sort-alpha-up'></i>
                        ) : (
                          ''
                        )}
                      </th>
                      <th
                        className='table-header'
                        onClick={() =>
                          sorted === 'typeAsc'
                            ? this.sortTable('typeDesc')
                            : this.sortTable('typeAsc')
                        }
                      >
                        {lang.type}{' '}
                        {sorted === 'typeAsc' ? (
                          <i className='fas fa-sort-alpha-down'></i>
                        ) : sorted === 'typeDesc' ? (
                          <i className='fas fa-sort-alpha-up'></i>
                        ) : (
                          ''
                        )}
                      </th>
                      <th
                        className='table-header'
                        onClick={() =>
                          sorted === 'countryAsc'
                            ? this.sortTable('countryDesc')
                            : this.sortTable('countryAsc')
                        }
                      >
                        {lang.country}{' '}
                        {sorted === 'countryAsc' ? (
                          <i className='fas fa-sort-alpha-down'></i>
                        ) : sorted === 'countryDesc' ? (
                          <i className='fas fa-sort-alpha-up'></i>
                        ) : (
                          ''
                        )}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageOfItems.map(place => (
                      <tr
                        key={place.id}
                        className='table-row'
                        onClick={() => this.selectPlace(place.id)}
                      >
                        <td>
                          {place.name}{' '}
                          {favorites.includes(place.id) && (
                            <span className='icon has-text-danger'>
                              <i className='fas fa-heart'></i>
                            </span>
                          )}{' '}
                          {visits.includes(place.id) && (
                            <span className='tag is-success'>
                              {lang.visited}
                            </span>
                          )}
                        </td>
                        <td>{lang[place.type]}</td>
                        <td>{place.country}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan='3'>
                        <Pagination
                          items={this.state.pageList}
                          onChangePage={this.onChangePage}
                          initialPage={1}
                          perPage={10}
                          lang={lang.pagination}
                        />
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </section>

            {place !== '' && (
              <PlaceModal
                lang={lang}
                place={place}
                visits={visits}
                favorites={favorites}
                clearPlace={this.clearPlace}
                takeVirtualTour={this.takeVirtualTour}
                addFavorite={this.addFavorite}
                removeFavorite={this.removeFavorite}
              />
            )}
          </Fragment>
        )}
      </div>
    );
  }
}
