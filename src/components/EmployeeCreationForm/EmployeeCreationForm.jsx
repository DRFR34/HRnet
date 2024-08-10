import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
    createEmployee,
    showModal,
    setError,
    setIsSubmitting,
    setFormData,
    setFieldsOnError,
    setFieldsBlurred,
    resetForm,
} from '../../redux/features/createEmployee/createEmployeeSlice.js';
import CustomDatePicker from '../CustomDatePicker/CustomDatePicker.jsx';
import usaStates from '../../assets/data/usaStates.js';
import departments from '../../assets/data/wealthHealthDepts.js';
import './EmployeeCreationForm.scss';
import { unwrapResult } from '@reduxjs/toolkit';
import MonthIcon from '../IconsComponents/MonthIcon.jsx';
import CustomSelect2 from '../CustomSelect2/CustomSelect2.jsx';
import CEFormElement from '../CEFormElement/CEFormElement.jsx';

import { formatDate, isValidDate, validateField, isFormValid } from '../../utils/employeeCreationUtils.js';

/**
 * EmployeeCreationForm component handles the creation of a new employee.
 *
 * @returns {JSX.Element} The rendered form component.
 */
export default function EmployeeCreationForm() {
    const dispatch = useDispatch();
    const { formData, fieldsOnError, isSubmitting, error } = useSelector(state => state.createEmployee);
    const [showDatePicker, setShowDatePicker] = useState({
        birthDate: false,
        startDate: false,
    });

    const dateFormat = 'MM/dd/yyyy';

    const birthDateInputRef = useRef(null);
    const startDateInputRef = useRef(null);

    /**
     * Handles changes to form fields. 
     * Validating and updating the form data and error messages accordingly.
     *
     * @param {object} e - The event object containing information about the changed field.
     * @return {void}
     */
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'birthDate' || name === 'startDate') {
            if (!isValidDate(value)) {
                dispatch(setFieldsOnError({ [name]: 'Date must be in MM/DD/YYYY format.' }));
            } else {
                dispatch(setFieldsOnError({ [name]: '' }));
            }
        }

        dispatch(setFormData({ [name]: value }));
        const errorMsg = validateField(name, value);
        dispatch(setFieldsOnError({ [name]: errorMsg }));
    };

    /**
     * Dispatches actions to set the field as blurred and updates error messages.
     *
     * @param {object} e - The event object containing information about the blurred field.
     * @return {void}
     */
    const handleBlur = (e) => {
        const { name, value } = e.target;
        dispatch(setFieldsBlurred({ [name]: true }));
        const errorMsg = validateField(name, value);
        dispatch(setFieldsOnError({ [name]: errorMsg }));
    };

    /**
     * Updates the form data and error messages accordingly.
     *
     * @param {string} field - The name of the field that has been updated.
     * @param {Date} date - The new date value for the field.
     * @return {void}
     */
    const handleDateChange = (field, date) => {
        const value = date ? formatDate(date, dateFormat) : '';
        dispatch(setFormData({ [field]: value }));
        const errorMsg = validateField(field, value);
        dispatch(setFieldsOnError({ [field]: errorMsg }));
        handleCloseDatePicker(field);
    };

    /**
     * Handles the form submission event.
     *
     * @param {object} e - The event object containing information about the submission.
     * @return {void}
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        if (!isFormValid(fieldsOnError, formData)) {
            dispatch(setFieldsBlurred({
                firstName: true,
                lastName: true,
                birthDate: true,
                startDate: true,
                street: true,
                city: true,
                state: true,
                zipCode: true,
                department: true,
            }));
            return;
        }

        dispatch(setIsSubmitting(true));

        try {
            const resultAction = await dispatch(createEmployee(formData));
            unwrapResult(resultAction);
            dispatch(showModal());
            dispatch(resetForm());

        } catch (error) {
            console.error('Failed to create employee', error);
            dispatch(setError(error.toString()));

        } finally {
            dispatch(setIsSubmitting(false));
        }
    };

    /**
     * Sets the value of the specified `field` to `false`.
     *
     * @param {string} field - The name of the field to update.
     * @return {void}
     */
    const handleCloseDatePicker = (field) => {
        setShowDatePicker(prevState => ({
            ...prevState,
            [field]: false,
        }));
    };

    return (
        <div className='formWrapper'>
            <form onSubmit={handleSubmit} className='form'>
                <fieldset className='form__fieldset'>
                    <legend>Identity information</legend>

                    <CEFormElement labClassName='form__fieldset__element__label' labHtmlFor="firstName" errorFieldName="firstName">
                        <input
                            id='firstName'
                            name='firstName'
                            className={`form__fieldset__element__input ${fieldsOnError.firstName ? 'form__fieldset__element__input--onError' : ''}`}
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </CEFormElement>

                    <CEFormElement labClassName='form__fieldset__element__label' labHtmlFor="lastName" errorFieldName="lastName">
                        <input
                            id='lastName'
                            name='lastName'
                            className={`form__fieldset__element__input ${fieldsOnError.lastName ? 'form__fieldset__element__input--onError' : ''}`}
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </CEFormElement>

                    <CEFormElement labClassName='form__fieldset__element__label' labHtmlFor="birthDate" errorFieldName="birthDate">
                        <div className="datePickerWrapper">
                            <input
                                id='birthDate'
                                name='birthDate'
                                className={`form__fieldset__element__input ${fieldsOnError.birthDate ? 'form__fieldset__element__input--onError' : ''}`}
                                type="text"
                                placeholder="MM/DD/YYYY"
                                value={formData.birthDate}
                                onChange={handleChange}
                                onFocus={() => setShowDatePicker({ ...showDatePicker, birthDate: true })}
                                onBlur={handleBlur}
                                ref={birthDateInputRef}
                            />
                            <button
                                className='OpenDatePickerBtn'
                                type="button"
                                aria-label="Open date picker"
                                onClick={() => {
                                    birthDateInputRef.current.focus();
                                    setShowDatePicker({ ...showDatePicker, birthDate: true });
                                }}
                            >
                                <MonthIcon />
                            </button>
                            {showDatePicker.birthDate && (
                                <CustomDatePicker
                                    selectedDate={isValidDate(formData.birthDate) ? new Date(formData.birthDate) : new Date()}
                                    onDateChanged={(date) => handleDateChange('birthDate', date)}
                                    onClose={() => handleCloseDatePicker('birthDate')}
                                />
                            )}
                        </div>
                    </CEFormElement>

                </fieldset>

                <fieldset className='form__fieldset'>
                    <legend>Professional information</legend>

                    <CEFormElement labClassName='form__fieldset__element__label' labHtmlFor="startDate" errorFieldName="startDate">
                        <div className="datePickerWrapper">
                            <input
                                id='startDate'
                                name='startDate'
                                className={`form__fieldset__element__input ${fieldsOnError.startDate ? 'form__fieldset__element__input--onError' : ''}`}
                                type="text"
                                placeholder="MM/DD/YYYY"
                                value={formData.startDate}
                                onChange={handleChange}
                                onFocus={() => setShowDatePicker({ ...showDatePicker, startDate: true })}
                                onBlur={handleBlur}
                                ref={startDateInputRef}
                            />
                            <button
                                className='OpenDatePickerBtn'
                                type="button"
                                aria-label="Open date picker"
                                onClick={() => {
                                    startDateInputRef.current.focus();
                                    setShowDatePicker({ ...showDatePicker, startDate: true });
                                }}
                            >
                                <MonthIcon />
                            </button>
                            {showDatePicker.startDate && (
                                <CustomDatePicker
                                    selectedDate={isValidDate(formData.startDate) ? new Date(formData.startDate) : new Date()}
                                    onDateChanged={(date) => handleDateChange('startDate', date)}
                                    onClose={() => handleCloseDatePicker('startDate')}
                                />
                            )}
                        </div>
                    </CEFormElement>

                    <CEFormElement labClassName='form__fieldset__element__label' labHtmlFor="department" errorFieldName="department">
                        <CustomSelect2
                            id="department"
                            name="department"
                            className={`form__fieldset__element__input ${fieldsOnError.department ? 'form__fieldset__element__input--onError' : ''}`}
                            value={formData.department}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option value="" disabled>Choose a department</option>
                            {departments.map(department => (
                                <option key={department.value} value={department.value}>
                                    {department.label}
                                </option>
                            ))}
                        </CustomSelect2>
                    </CEFormElement>

                </fieldset>

                <fieldset className='form__fieldset'>
                    <legend>Address</legend>

                    <CEFormElement labClassName='form__fieldset__element__label' labHtmlFor="street" errorFieldName="street">
                        <input
                            id='street'
                            name='street'
                            className={`form__fieldset__element__input ${fieldsOnError.street ? 'form__fieldset__element__input--onError' : ''}`}
                            type="text"
                            value={formData.street}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </CEFormElement>

                    <CEFormElement labClassName='form__fieldset__element__label' labHtmlFor="city" errorFieldName="city">
                        <input
                            id='city'
                            name='city'
                            className={`form__fieldset__element__input ${fieldsOnError.city ? 'form__fieldset__element__input--onError' : ''}`}
                            type="text"
                            value={formData.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </CEFormElement>

                    <CEFormElement labClassName='form__fieldset__element__label' labHtmlFor="state" errorFieldName="state">
                        <CustomSelect2
                            id="state"
                            name="state"
                            className={`form__fieldset__element__input ${fieldsOnError.state ? 'form__fieldset__element__input--onError' : ''}`}
                            value={formData.state}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <option value="" disabled>Choose a state</option>
                            {usaStates.map(state => (
                                <option key={state.value} value={state.value}>
                                    {state.label}
                                </option>
                            ))}
                        </CustomSelect2>
                    </CEFormElement>

                    <CEFormElement labClassName='form__fieldset__element__label' labHtmlFor="zipCode" errorFieldName="zipCode">
                        <input
                            id='zipCode'
                            name='zipCode'
                            className={`form__fieldset__element__input ${fieldsOnError.zipCode ? 'form__fieldset__element__input--onError' : ''}`}
                            type="text"
                            value={formData.zipCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </CEFormElement>
                </fieldset>

                <button
                    type='submit'
                    className='form__button'
                    aria-label='Save employee'
                    disabled={!isFormValid(fieldsOnError, formData) || isSubmitting}
                >
                    Save
                </button>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
    );
}

/**
 * PropTypes for EmployeeCreationForm component.
 */
EmployeeCreationForm.propTypes = {
    formData: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        birthDate: PropTypes.string,
        startDate: PropTypes.string,
        street: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        zipCode: PropTypes.string,
        department: PropTypes.string,
    }),
    fieldsOnError: PropTypes.objectOf(PropTypes.string),
    isSubmitting: PropTypes.bool,
    error: PropTypes.string,
};