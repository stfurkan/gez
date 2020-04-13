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
    this.setState(
      {
        place: place[0]
      },
      () => {
        window.scrollTo(0, this.placeRef.current.offsetTop);
      }
    );
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
      <div className='ui container'>
        <PageTitle title={lang.pageTitle} metaContent={lang.metaContent} />
        <div>
          <div className='ui segment place-segment'>
            <div
              className={place === '' ? 'hide-element' : 'ui raised segment'}
              ref={this.placeRef}
            >
              <div className='ui grid stackable'>
                <div className='row'>
                  <div className='ten wide column'>
                    <div className='ui list'>
                      <div className='item'>
                        <div className='ui teal big label'>{lang.name}</div>{' '}
                        <span className='ui large text'>
                          {place.name}{' '}
                          {visits.includes(place.id) && (
                            <div className='ui green label'>
                              {lang.visited} <i className='check icon'></i>
                            </div>
                          )}
                        </span>
                      </div>
                      <div className='item'>
                        <div className='ui teal big label'>{lang.type}</div>{' '}
                        <span className='ui large text'>
                          {lang[place.type]}
                        </span>
                      </div>

                      <div className='item'>
                        <div className='ui teal big label'>{lang.address}</div>{' '}
                        <span className='ui large text'>
                          {place.state === ''
                            ? `${place.city}, ${place.country}`
                            : `${place.city}, ${place.state}, ${place.country}`}
                        </span>
                      </div>
                      <div className='item'>
                        <div className='ui teal big label'>
                          {lang.description}
                        </div>{' '}
                        <span className='ui large text'>
                          {place.description}{' '}
                          <a
                            className='ui grey tiny label'
                            href={place.wikipedia}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            {lang.wikipedia}
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='six wide column'>
                    <div className='ui list'>
                      <div className='item'>
                        <a
                          className='ui blue massive label'
                          href={place.virtual}
                          target='_blank'
                          rel='noopener noreferrer'
                          onClick={() => this.takeVirtualTour(place.id)}
                        >
                          {lang.virtualTour}
                        </a>
                      </div>
                      <div className='item'>
                        <a
                          className='ui blue massive label'
                          href={place.website}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {lang.website}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className='ui red right corner label close-label'
                onClick={() => this.setState({ place: '' })}
              >
                <i className='close icon close-label'></i>
              </div>
            </div>
            <div className='main-segment'>
              <div className='main-filter'>
                <div className='ui icon input'>
                  <input
                    type='text'
                    placeholder={lang.searchPlace}
                    name='searchPlace'
                    value={searchPlace}
                    onChange={this.onChangeElem}
                  />
                  {searchPlace === '' ? (
                    <i className='search icon'></i>
                  ) : (
                    <i
                      className='circular close link icon'
                      onClick={() => this.setState({ searchPlace: '' })}
                    ></i>
                  )}
                </div>
                <select
                  value={selectCountry}
                  name='selectCountry'
                  className='ui selection dropdown country-dropdown'
                  onChange={this.onChangeElem}
                >
                  <option value='all'>{lang.allCountries}</option>
                  {countries.map(country => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <select
                  value={selectType}
                  name='selectType'
                  className='ui selection dropdown country-dropdown'
                  onChange={this.onChangeElem}
                >
                  <option value='all'>{lang.allTypes}</option>
                  {types.map(type => (
                    <option key={type} value={type}>
                      {lang[type]}
                    </option>
                  ))}
                </select>
                <div
                  className={
                    searchPlace === '' &&
                    selectCountry === 'all' &&
                    selectType === 'all'
                      ? 'hide-element'
                      : 'ui primary button'
                  }
                  onClick={() => this.clearFilter()}
                >
                  {lang.clearFilter}
                </div>
              </div>

              <div>
                <Map
                  places={pageList}
                  selectPlace={this.selectPlace}
                  lang={lang.map}
                  visits={visits}
                />
              </div>
              <div>
                <table className='ui sortable unstackable celled table table-segment'>
                  <thead>
                    <tr>
                      <th onClick={() => this.sortTable('name')}>
                        {lang.name}
                        {sorted.name === 1 ? (
                          <i className='caret down icon'></i>
                        ) : sorted.name === 2 ? (
                          <i className='caret up icon'></i>
                        ) : (
                          ''
                        )}
                      </th>
                      <th onClick={() => this.sortTable('type')}>
                        {lang.type}
                        {sorted.type === 1 ? (
                          <i className='caret down icon'></i>
                        ) : sorted.type === 2 ? (
                          <i className='caret up icon'></i>
                        ) : (
                          ''
                        )}
                      </th>
                      <th onClick={() => this.sortTable('country')}>
                        {lang.country}
                        {sorted.country === 1 ? (
                          <i className='caret down icon'></i>
                        ) : sorted.country === 2 ? (
                          <i className='caret up icon'></i>
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
                            <div className='ui green label'>
                              {lang.visited} <i className='check icon'></i>
                            </div>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
