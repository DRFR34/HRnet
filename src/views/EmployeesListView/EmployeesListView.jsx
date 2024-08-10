import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSortableTable from 'react-sortable-customizable-table';
import {
  fetchEmployees,
  selectAllEmployees,
  selectEmployeesStatus,
  selectEmployeesError,
  setRowsPerPage,
  setSelectedColumns,
  setCurrentPage,
  setSearchValue,
  setAutoSearch,
  setSearchIsTriggered,
  setFilteredData
} from '../../redux/features/employees/employeesSlice';
import SearchBar from '../../components/SearchBar/SearchBar';
import NoDataMsg from '../../components/NoDataMsg/NoDataMsg';
import PaginationBar from '../../components/PaginationBar/PaginationBar';
import '../../assets/scss/VarAndMixins.scss';
import './EmployeesListView.scss';

/**
 * EmployeesListView is a component that displays a list of employees with sorting, searching, 
 * and pagination functionalities. It utilizes a customizable table, search bar, and pagination 
 * components to manage and display the data effectively.
 * 
 * @component
 */
export default function EmployeesListView() {
  const dispatch = useDispatch();

  const employees = useSelector(selectAllEmployees);
  const status = useSelector(selectEmployeesStatus);
  const error = useSelector(selectEmployeesError);
  const rowsPerPage = useSelector((state) => state.employees.rowsPerPage);
  const selectedColumns = useSelector((state) => state.employees.selectedColumns);
  const currentPage = useSelector((state) => state.employees.currentPage);
  const searchValue = useSelector((state) => state.employees.searchValue);
  const autoSearch = useSelector((state) => state.employees.autoSearch);
  const searchIsTriggered = useSelector((state) => state.employees.searchIsTriggered);
  const filteredData = useSelector((state) => state.employees.filteredData);

  const columns = [
    { label: "First name", accessor: "firstName" },
    { label: "Last name", accessor: "lastName" },
    { label: "Start date", accessor: "startDate" },
    { label: "Department", accessor: "department" },
    { label: "Date of birth", accessor: "birthDate" },
    { label: "Street", accessor: "street" },
    { label: "City", accessor: "city" },
    { label: "State", accessor: "state" },
    { label: "Zip code", accessor: "zipCode" },
  ];

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    const employeesDataFiltered = (employeesData) => {
      if (!Array.isArray(employeesData)) {
        console.error("employeesData is not iterable:", employeesData);
        return [];
      }

      let filtered = [...employeesData];

      if (searchValue && (autoSearch || searchIsTriggered)) {
        filtered = filtered.filter((employee) =>
          Object.entries(employee)
            .some(([key, value]) =>
              key !== 'id' &&
              String(value).toLowerCase().includes(searchValue.toLowerCase())
            )
        );
      }

      return filtered;
    };

    dispatch(setFilteredData(employeesDataFiltered(employees)));
  }, [searchValue, autoSearch, searchIsTriggered, employees, dispatch]);

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <div>
      <SearchBar
        searchValue={searchValue}
        setSearchValue={(value) => dispatch(setSearchValue(value))}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={(value) => dispatch(setRowsPerPage(value))}
        autoSearch={autoSearch}
        setAutoSearch={(value) => dispatch(setAutoSearch(value))}
        setSearchIsTriggered={(value) => dispatch(setSearchIsTriggered(value))}
        columns={columns}
        selectedColumns={selectedColumns}
        setSelectedColumns={(value) => dispatch(setSelectedColumns(value))}
      />
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <>
          <ReactSortableTable
            tableData={paginatedData}
            columns={columns.filter(column => Array.isArray(selectedColumns) && selectedColumns.includes(column.accessor))}
            headerBgColor="#335123"
            headerTextColor="white"
            headerHoverBgColor="#a4da879a"
            headerHoverTextColor="#335123"
            headerActiveBgColor="#a4da879a"
            headerActiveTextColor="black"
            bodyTextColor="black"
            rowEvenBgColor="white"
            rowOddBgColor="#f2f2f2"
            rowHoverBgColor="#a4da879a"
            sortable={true}
            dateFormat="MM/dd/yy"
          />

          {filteredData.length === 0 &&
            <NoDataMsg
              searchValue={searchValue}
              searchResult={filteredData.length}
            />}
          {filteredData.length > 0 && (
            <PaginationBar
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={Math.ceil(filteredData.length / rowsPerPage)}
              rowsPerPage={rowsPerPage}
              totalEntries={filteredData.length}
              handlePageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
