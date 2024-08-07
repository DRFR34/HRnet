import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage} from '../../redux/features/employees/employeesSlice';

import './PaginationBar.scss';

export default function PaginationBar({ totalPages, searchValue, totalEntries, handlePageChange }) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.employees.currentPage);
  const rowsPerPage = useSelector((state) => state.employees.rowsPerPage);
  const searchIsTriggered = useSelector((state) => state.employees.searchIsTriggered);
  const autoSearch = useSelector((state) => state.employees.autoSearch);

  const startEntry = (currentPage - 1) * rowsPerPage + 1;
  const endEntry = Math.min(currentPage * rowsPerPage, totalEntries);

  /**
   * The two following useEffect are used to ensure the current page is not out of bound, when changing the number of rows per page, or when changing the search value, or when launching the search
   */
  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [rowsPerPage, searchValue, dispatch]);

  useEffect(() => {
    if (searchIsTriggered || autoSearch) {
      dispatch(setCurrentPage(1));
    }
  }, [searchIsTriggered, autoSearch]);

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

        <span className="paginationBar__Nav__Text">
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
