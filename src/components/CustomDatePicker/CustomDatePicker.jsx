import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import CustomSelect from '../CustomSelect/CustomSelect';
import TodayIcon from '../IconsComponents/TodayIcon';
import LeftIcon from '../IconsComponents/LeftIcon';
import RightIcon from '../IconsComponents/RightIcon';

import './CustomDatePicker.scss';

/**
 * CustomDatePicker component renders a custom date picker UI.
 * It allows users to select a specific date, navigate between months and years,
 * and choose the current date using various controls.
 * 
 * @component
 * @param {Object} props - The props that define this component.
 * @param {string|Date} props.selectedDate - The currently selected date, passed as a string or Date object.
 * @param {function(Date):void} props.onDateChanged - Callback function to handle the event when a date is selected.
 * @param {function():void} props.onClose - Callback function to handle the event when the date picker is closed.
 */
export default function CustomDatePicker({ selectedDate, onDateChanged, onClose }) {
    const [currentDate, setCurrentDate] = useState(selectedDate ? new Date(selectedDate) : new Date());
    const datePickerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const handleMonthChange = (monthChange) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + monthChange);
        setCurrentDate(newDate);
    };

    const handleYearChange = (yearChange) => {
        const newDate = new Date(currentDate);
        newDate.setFullYear(newDate.getFullYear() + yearChange);
        setCurrentDate(newDate);
    };

    const handleDayClick = (day, monthChange) => {
        const newDate = new Date(currentDate);
        newDate.setDate(day);
        if (monthChange) {
            newDate.setMonth(newDate.getMonth() + monthChange);
        }
        onDateChanged(newDate);
        onClose();
    };

    const handleTodayClick = () => {
        const today = new Date();
        setCurrentDate(today);
    };

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const monthOptions = Array.from({ length: 12 }, (_, index) => ({
        value: index,
        label: new Date(2000, index).toLocaleString('en-US', { month: 'long' })
    }));

    const yearOptions = Array.from({ length: 101 }, (_, index) => {
        const year = 1950 + index;
        return { value: year, label: year };
    });

    const previousMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    const daysFromPreviousMonth = [...Array(startDay)].map((_, index) => previousMonthDays - startDay + index + 1);
    const daysFromCurrentMonth = [...Array(daysInMonth)].map((_, day) => day + 1);
    const daysFromNextMonth = [...Array(6 - ((startDay + daysInMonth) % 7 - 1))].map((_, index) => index + 1);

    return (
        <div className="customDatePicker" ref={datePickerRef}>
            <div className="header">
                <button
                    className='header__goTodayBtn'
                    type="button"
                    aria-label='Go to today'
                    onClick={handleTodayClick}>
                    <TodayIcon
                        className='header__goTodayBtn__icon'
                    />
                </button>

                <div className='selectGroup'>
                    <button
                        className='selectGroup__btn'
                        type="button"
                        aria-label='Previous month'
                        onClick={() => handleMonthChange(-1)}>
                        <LeftIcon />
                    </button>
                    <CustomSelect
                        options={monthOptions.map(option => option.label)}
                        selectedOption={monthOptions[currentDate.getMonth()].label}
                        onOptionSelected={(selected) => {
                            const month = monthOptions.find(option => option.label === selected).value;
                            handleMonthChange(month - currentDate.getMonth());
                        }}
                    />
                    <button
                        className='selectGroup__btn'
                        type="button"
                        aria-label='Next month'
                        onClick={() => handleMonthChange(1)}>
                        <RightIcon />
                    </button>
                </div>

                <div className='selectGroup'>
                    <button
                        className='selectGroup__btn'
                        type="button"
                        aria-label='Previous year'
                        onClick={() => handleYearChange(-1)}>
                        <LeftIcon />
                    </button>
                    <CustomSelect
                        options={yearOptions.map(option => option.label)}
                        selectedOption={currentDate.getFullYear().toString()}
                        onOptionSelected={(selected) => {
                            const year = yearOptions.find(option => option.label === selected).value;
                            handleYearChange(year - currentDate.getFullYear());
                        }}
                    />
                    <button
                        className='selectGroup__btn'
                        type="button"
                        aria-label='Next year'
                        onClick={() => handleYearChange(1)}>
                        <RightIcon />
                    </button>
                </div>

            </div>
            <div className='monthCalendar'>
                <div className='daysNamesContainer'>
                    {dayNames.map((day, index) => (
                        <div key={index} className="dayName">{day}</div>
                    ))}
                </div>

                <div className="daysGrid">
                    {daysFromPreviousMonth.map((day, index) => (
                        <button
                            key={`prev-${index}`}
                            type="button"
                            className="outOfMonthDayBtn dayBtn"
                            aria-label={`Select the ${day}th of the previous month.`}
                            onClick={() => handleDayClick(day, -1)}
                        >
                            {day}
                        </button>
                    ))}

                    {daysFromCurrentMonth.map((day) => (
                        <button
                            key={day}
                            type="button"
                            className={`dayBtn ${day === currentDate.getDate() ? 'selectedDayBtn' : ''} ${day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear() ? 'todayBtn' : ''}`}
                            aria-label={`Select the ${day}th of the current month.`}
                            onClick={() => handleDayClick(day)}
                        >
                            {day}
                        </button>
                    ))}

                    {daysFromNextMonth.map((day, index) => (
                        <button
                            key={`next-${index}`}
                            type="button"
                            className="outOfMonthDayBtn dayBtn"
                            aria-label={`Select the ${day}th of the next month.`}
                            onClick={() => handleDayClick(day, 1)}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

CustomDatePicker.propTypes = {
    /**
     * The currently selected date, passed as a string or Date object.
     */
    selectedDate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date)
    ]),

    /**
     * Callback function to handle the event when a date is selected.
     * Receives the selected date as a Date object.
     */
    onDateChanged: PropTypes.func.isRequired,

    /**
     * Callback function to handle the event when the date picker is closed.
     */
    onClose: PropTypes.func.isRequired,
};
