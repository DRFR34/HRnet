import React, { useEffect } from 'react';

import './PaginationBar.scss';


export default function PaginationBar({ currentPage, setCurrentPage, totalPages, searchValue, rowsPerPage, totalEntries, handlePageChange }) {

  const startEntry = (currentPage - 1) * rowsPerPage + 1;
  const endEntry = Math.min(currentPage * rowsPerPage, totalEntries);

  /**  
   * Ensures the current page is not out of bound, when changing the number of rows per page, or when changing the search value
   * 
  */
  useEffect(() => {
    setCurrentPage(1);
  }, [rowsPerPage, searchValue]);

  return (
    <div className="paginationBar">

      <div className="paginationBar__entriesInfos">
        Showing {startEntry} to {endEntry} of {totalEntries} entries
      </div>

      <div className="paginationBar__Nav">
        <button
          className="paginationBar__Nav__Btn"
          aria-label="Go to previous page"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>

        <span
          className="paginationBar__Nav__Text">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="paginationBar__Nav__Btn"
          aria-label="Go to next page"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>

      </div>

    </div>
  );
}

