import React, { Component } from 'react';

import PageTitle from '../layouts/PageTitle';
import Map from './Map';
import Pagination from '../layouts/Pagination';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.placeRef = React.createRef();

    const { places } = props;

    this.state = {
      places: [...places],
      pageList: [...places],
      pageOfItems: [],
      selectCountry: 'all',
      selectType: 'all',
      searchPlace: '',
      place: '',
      sorted: {
        name: 0,
        type: 0,
        country: 0
      },
      visits: JSON.parse(localStorage.getItem('visits'))
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

  sortTable = sortItem => {
    const { pageList, sorted } = this.state;
    const { lang } = this.props;

    let sortedItems = [...pageList];

    // Sort by name
    if (sortItem === 'name') {
      if (sorted.name === 0) {
        sortedItems = [...sortedItems].sort((a, b) =>
          a.name > b.name ? 1 : -1
        );

        this.setState({
          sorted: {
            name: 1,
            type: 0,
            country: 0
          },
          pageList: [...sortedItems]
        });
      }

      if (sorted.name === 1) {
        sortedItems = [...sortedItems].sort((a, b) =>
          b.name > a.name ? 1 : -1
        );

        this.setState({
          sorted: {
            name: 2,
            type: 0,
            country: 0
          },
          pageList: [...sortedItems]
        });
      }

      if (sorted.name === 2) {
        sortedItems = [...sortedItems].sort((a, b) =>
          a.name > b.name ? 1 : -1
        );

        this.setState({
          sorted: {
            name: 1,
            type: 0,
            country: 0
          },
          pageList: [...sortedItems]
        });
      }
    }

    // Sort by type
    if (sortItem === 'type') {
      if (sorted.type === 0) {
        sortedItems = [...sortedItems].sort((a, b) =>
          lang[a.type] > lang[b.type] ? 1 : -1
        );

        this.setState({
          sorted: {
            name: 0,
            type: 1,
            country: 0
          },
          pageList: [...sortedItems]
        });
      }

      if (sorted.type === 1) {
        sortedItems = [...sortedItems].sort((a, b) =>
          lang[b.type] > lang[a.type] ? 1 : -1
        );

        this.setState({
          sorted: {
            name: 0,
            type: 2,
            country: 0
          },
          pageList: [...sortedItems]
        });
      }

      if (sorted.type === 2) {
        sortedItems = [...sortedItems].sort((a, b) =>
          lang[a.type] > lang[b.type] ? 1 : -1
        );

        this.setState({
          sorted: {
            name: 0,
            type: 1,
            country: 0
          },
          pageList: [...sortedItems]
        });
      }
    }

    // Sort by country
    if (sortItem === 'country') {
      if (sorted.country === 0) {
        sortedItems = [...sortedItems].sort((a, b) =>
          a.country > b.country ? 1 : -1
        );

        this.setState({
          sorted: {
            name: 0,
            type: 0,
            country: 1
          },
          pageList: [...sortedItems]
        });
      }

      if (sorted.country === 1) {
        sortedItems = [...sortedItems].sort((a, b) =>
          b.country > a.country ? 1 : -1
        );

        this.setState({
          sorted: {
            name: 0,
            type: 0,
            country: 2
          },
          pageList: [...sortedItems]
        });
      }

      if (sorted.country === 2) {
        sortedItems = [...sortedItems].sort((a, b) =>
          a.country > b.country ? 1 : -1
        );

        this.setState({
          sorted: {
            name: 0,
            type: 0,
            country: 1
          },
          pageList: [...sortedItems]
        });
      }
    }
  };

  componentDidMount() {
    this.sortTable('name');
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

      this.setState({
        pageList: filteredList
      });
    }
  };

  render() {
    const { lang } = this.props;
    const {
      places,
      place,
      pageList,
      pageOfItems,
      searchPlace,
      selectCountry,
      selectType,
      visits,
      sorted
    } = this.state;

    let countries = [];
    places.forEach(place => {
      if (!countries.includes(place.country)) {
        countries.push(place.country);
      }
    });
    countries.sort((a, b) => (a > b ? 1 : -1));

    let types = [];
    places.forEach(place => {
      if (!types.includes(place.type)) {
        types.push(place.type);
      }
    });
    types.sort((a, b) => (lang[a] > lang[b] ? 1 : -1));

    return (
      <div>
        <PageTitle title={lang.pageTitle} metaContent={lang.metaContent} />
        <br />

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
                  className='button is-fullwidth'
                  onClick={() => this.clearFilter()}
                >
                  {lang.clearFilter}
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
                  <th onClick={() => this.sortTable('name')}>
                    {lang.name}{' '}
                    {sorted.name === 1 ? (
                      <i className='fas fa-sort-alpha-down'></i>
                    ) : sorted.name === 2 ? (
                      <i className='fas fa-sort-alpha-up'></i>
                    ) : (
                      ''
                    )}
                  </th>
                  <th onClick={() => this.sortTable('type')}>
                    {lang.type}{' '}
                    {sorted.type === 1 ? (
                      <i className='fas fa-sort-alpha-down'></i>
                    ) : sorted.type === 2 ? (
                      <i className='fas fa-sort-alpha-up'></i>
                    ) : (
                      ''
                    )}
                  </th>
                  <th onClick={() => this.sortTable('country')}>
                    {lang.country}{' '}
                    {sorted.country === 1 ? (
                      <i className='fas fa-sort-alpha-down'></i>
                    ) : sorted.country === 2 ? (
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
                      {visits.includes(place.id) && (
                        <span className='tag is-success'>
                          {lang.visited} <i className='fas fa-check'></i>
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

        <div
          className={
            place === ''
              ? 'modal modal-container'
              : 'modal modal-container is-active'
          }
        >
          <div
            className='modal-background'
            onClick={() => this.setState({ place: '' })}
          ></div>
          <div className='modal-card'>
            <header className='modal-card-head'>
              <p className='modal-card-title'>
                {visits.includes(place.id) && (
                  <span className='tag is-success'>
                    {lang.visited} <i className='fas fa-check'></i>
                  </span>
                )}
              </p>
              <button
                className='delete'
                onClick={() => this.setState({ place: '' })}
              ></button>
            </header>
            <section className='modal-card-body is-marginless'>
              <div className='content has-text-left'>
                <div className='box is-marginless'>
                  <div className='columns is-gapless'>
                    <div className='column is-one-fifth'>
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
                    <div className='column is-one-fifth'>
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
                    <div className='column is-one-fifth'>
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
                    <div className='column is-one-fifth'>
                      <span className='tag is-info is-light is-large'>
                        {lang.description}
                      </span>
                    </div>

                    <div className='column'>
                      {place.description}{' '}
                      <a
                        className='tag is-small is-primary'
                        href={place.wikipedia}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {lang.wikipedia}
                      </a>
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
                onClick={() => this.takeVirtualTour(place.id)}
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
      </div>
    );
  }
}
