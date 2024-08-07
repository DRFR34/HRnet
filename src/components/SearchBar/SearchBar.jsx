import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { setSelectedColumns } from '../../redux/features/employees/employeesSlice';

import CustomSelect from '../CustomSelect/CustomSelect';
import SearchIcon from '../IconsComponents/SearchIcon';
import SettingsIcon from '../IconsComponents/SettingsIcon';
import CloseIcon from '../IconsComponents/CloseIcon';
import PopulateEmployees from '../PopulateEmployees/PopulateEmployees';

import './SearchBar.scss';
export default function SearchBar({
  searchValue,
  setSearchValue,
  rowsPerPage,
  setRowsPerPage,
  setAutoSearch,
  setSearchIsTriggered,
  columns,
  selectedColumns
}) {

  const [showSettingsCommands, setShowSettingsCommands] = useState(false);
  const rowsPerPageOptions = [5, 10, 25, 50, 100];
  const setBarRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (setBarRef.current && !setBarRef.current.contains(event.target)) {
        setShowSettingsCommands(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setBarRef]);

  const handleClearSearch = () => {
    setSearchValue('');
    setAutoSearch(false);
    setSearchIsTriggered(false);
  };

  const toggleColumnSelection = (accessor) => {

    const updatedColumns = selectedColumns.includes(accessor)
      ? selectedColumns.filter(col => col !== accessor)
      : [...selectedColumns, accessor];

    dispatch(setSelectedColumns(updatedColumns));
  };

  return (
    <div className='toolsWrapper'>
      <form className="toolsWrapper__form" onSubmit={(e) => { e.preventDefault(); }}>

        <div className="toolsWrapper__form__itemBox1">

          <div
            ref={setBarRef}
            className='toolsWrapper__form__itemBox1__settingsBar'
          >

            <div
              className='toolsWrapper__form__itemBox1__settingsBar__header'
              onClick={() => setShowSettingsCommands(!showSettingsCommands)}
            >

              <h2 className='toolsWrapper__form__itemBox1__settingsBar__header__title' >
                Settings
              </h2>

              <button
                className="toolsWrapper__form__itemBox1__settingsBar__header__toggleBtn"
                type="button"
                aria-label="Toggle settings bar"
                onClick={() => setShowSettingsCommands(!showSettingsCommands)}
              >
                {showSettingsCommands
                  ? <CloseIcon />
                  : <SettingsIcon
                    className='toolsWrapper__form__itemBox1__settingsBar__header__toggleBtn__SettingsIcon'
                  />
                }
              </button>

            </div>

            {showSettingsCommands && (
              <>
                <div className="toolsWrapper__form__itemBox1__settingsBar__rowsPerPageBox">

                  <span className="toolsWrapper__form__itemBox1__settingsBar__rowsPerPageBox__label">
                    Rows per page :
                  </span>

                  <CustomSelect
                    className='toolsWrapper__form__itemBox1__settingsBar__rowsPerPageBox__select'
                    style={{ width: '80px' }}
                    optionsListStyle={{ width: '50px' }}
                    options={rowsPerPageOptions}
                    selectedOption={rowsPerPage}
                    onOptionSelected={
                      (selected) => { setRowsPerPage(Number(selected)); }
                    }
                  />

                </div>

                <div className="toolsWrapper__form__itemBox1__settingsBar__columnsSelector">

                  <h3>Select columns</h3>

                  {columns.map((column) => (
                    <label
                      key={column.accessor}
                      className="toolsWrapper__form__itemBox1__settingsBar__columnsSelector__item"
                    >

                      <input
                        type="checkbox"
                        checked={selectedColumns.includes(column.accessor)}
                        onChange={() => toggleColumnSelection(column.accessor)}
                      />

                      <span className="checkmark"></span>
                      {column.label}
                    </label>
                  ))}
                </div>

                <PopulateEmployees />
              </>
            )}
          </div>
        </div>

        <div className="toolsWrapper__form__itemBox2">

          <div className='toolsWrapper__form__itemBox2__field'>

            <label
              className='toolsWrapper__form__itemBox2__field__label'
              htmlFor="searchInput">
              Search:
            </label>

            <input
              id="searchInput"
              className="toolsWrapper__form__itemBox2__field__searchInput"
              name='searchInput'
              type="text"
              value={searchValue}
              onChange={(e) => {
                const value = e.target.value;
                setSearchValue(value);
                setAutoSearch(value.length > 2);
                setSearchIsTriggered(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  setSearchIsTriggered(true);
                }
              }}
            />

            {searchValue && (
              <button
                className="toolsWrapper__form__itemBox2__field__clearBtn"
                type="button"
                aria-label="Clear search"
                onClick={handleClearSearch}
              >
                <CloseIcon />
              </button>
            )}

            <button
              className="toolsWrapper__form__itemBox2__field__searchBtn"
              type="button"
              aria-label="Search"
              onClick={() => {
                setSearchIsTriggered(true);
              }}
            >
              <SearchIcon
                className="searchIcon"
                strokeWidth={3}
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
