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
      sorted: '',
      visits: JSON.parse(localStorage.getItem('visits')),
      welcome: localStorage.getItem('welcome') === null ? true : false
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

  closeWelcome = () => {
    localStorage.setItem('welcome', false);
    this.setState({
      welcome: false
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

  componentDidMount() {
    this.sortTable('nameAsc');
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
      welcome,
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

    return (
      <div>
        <PageTitle title={lang.pageTitle} metaContent={lang.metaContent} />

        <section className='section is-paddingless'>
          <div className='container'>
            <div className='notification is-light has-text-centered has-text-weight-semibold is-italic is-paddingless'>
              {lang.visitedPlaces}: <strong>{visits.length}</strong> /{' '}
              {lang.totalPlaces}: <strong>{places.length}</strong>
            </div>
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
                      {visits.includes(place.id) && (
                        <span className='tag is-success'>{lang.visited}</span>
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
                  <span className='tag is-success'>{lang.visited}</span>
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
                    <div className='column is-one-quarter'>
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

        <div
          className={
            welcome === false
              ? 'modal modal-container'
              : 'modal modal-container is-active'
          }
        >
          <div
            className='modal-background'
            onClick={() => this.closeWelcome()}
          ></div>
          <div className='modal-card'>
            <header className='modal-card-head'>
              <p className='modal-card-title'>
                <strong>{lang.welcome.header}</strong>
              </p>
              <button
                className='delete'
                onClick={() => this.closeWelcome()}
              ></button>
            </header>
            <section className='modal-card-body is-marginless'>
              <div className='content has-text-left'>
                <p>{lang.metaContent}</p>
                <p>{lang.welcome.text}</p>
              </div>
            </section>

            <footer className='modal-card-foot'>
              <button
                className='button is-link is-rounded is-large'
                onClick={() => this.closeWelcome()}
              >
                {lang.welcome.continue} <i className='fas fa-arrow-right'></i>
              </button>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}
