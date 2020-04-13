import React, { Component } from 'react';

class Pagination extends Component {
  state = { pager: {} };

  componentDidMount() {
    // set page if items array isn't empty
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }

  componentDidUpdate(pp, ps) {
    // reset page if items array has changed
    if (this.props.items !== pp.items || this.props.perPage !== pp.perPage) {
      this.setPage(this.props.initialPage);
    }
  }

  setPage(page) {
    let items = this.props.items;
    let pager = this.state.pager;

    if (page < 1 || (page > pager.totalPages && pager.totalPages !== 0)) {
      return;
    }

    // get new pager object for specified page
    pager = this.getPager(items.length, page);

    // get new page of items from items array
    let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    // update state
    this.setState({ pager: pager });

    // call change page function in parent component
    this.props.onChangePage(pageOfItems);
  }

  getPager(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || this.props.perPage;

    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage, endPage;
    if (totalPages <= 5) {
      // less than 5 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 5 total pages so calculate start and end pages
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = [...Array(endPage + 1 - startPage).keys()].map(
      i => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  render() {
    let pager = this.state.pager;

    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null;
    }

    return (
      <div key={pager.currentPage} className='ui right floated nine item menu'>
        <div
          className={
            pager.currentPage < 2
              ? 'ui icon item disabled-pagination-item'
              : 'ui icon item pagination-item '
          }
          onClick={() => this.setPage(1)}
        >
          <i className='angle double left icon'></i>
        </div>

        <div
          className={
            pager.currentPage < 2
              ? 'ui icon item disabled-pagination-item'
              : 'ui icon item pagination-item '
          }
          onClick={() => this.setPage(pager.currentPage - 1)}
        >
          <i className='angle left icon'></i>
        </div>

        {pager.pages.map((page, index) => (
          <div
            className={
              page === pager.currentPage
                ? 'ui item disabled-pagination-item'
                : 'ui item pagination-item'
            }
            key={`page-${index}`}
            title={`${this.props.lang.text}: ${page}`}
            onClick={() => this.setPage(page)}
          >
            <span>{page}</span>
          </div>
        ))}

        <div
          className={
            pager.totalPages > 0 && pager.currentPage === pager.totalPages
              ? 'ui icon item disabled-pagination-item'
              : 'ui icon item pagination-item'
          }
          onClick={() => this.setPage(pager.currentPage + 1)}
        >
          <i className='angle right icon'></i>
        </div>

        <div
          className={
            pager.totalPages > 0 && pager.currentPage === pager.totalPages
              ? 'ui icon item disabled-pagination-item'
              : 'ui icon item pagination-item'
          }
          onClick={() => this.setPage(pager.totalPages)}
        >
          <i className='angle double right icon'></i>
        </div>
      </div>
    );
  }
}

export default Pagination;
