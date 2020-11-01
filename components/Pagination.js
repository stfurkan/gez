import React, { useState, useEffect } from 'react';

export default function Pagination({ places, perPage, setPageElements, lang }) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setPageElements(
      places.slice((currentPage - 1) * perPage, currentPage * perPage)
    );
  }, [places, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [places]);

  let totalPages = Math.ceil(places.length / perPage);
  return (
    totalPages > 1 && (
      <div className='flex-1 flex items-center justify-around mt-1'>
        <button
          type='button'
          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-${
            currentPage === 1 ? '200' : '700'
          } bg-white hover:text-gray-${
            currentPage === 1 ? '100' : '500'
          } focus:outline-none active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
            currentPage === 1 && 'pointer-events-none'
          }`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {lang.previous}
        </button>

        <div>
          {currentPage} <span className='font-medium'>/</span> {totalPages}
        </div>

        <button
          type='button'
          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-${
            currentPage === totalPages ? '200' : '700'
          } bg-white hover:text-gray-${
            currentPage === totalPages ? '100' : '500'
          } focus:outline-none active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 ${
            currentPage === totalPages && 'pointer-events-none'
          }`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {lang.next}
        </button>
      </div>
    )
  );
}
