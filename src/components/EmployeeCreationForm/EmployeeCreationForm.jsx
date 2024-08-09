import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee, showModal, setError, setIsSubmitting, setFormData, setFieldsOnError, setFieldsBlurred, resetForm } from '../../redux/features/createEmployee/createEmployeeSlice.js';
import CustomDatePicker from '../CustomDatePicker/CustomDatePicker.jsx';
import usaStates from '../../assets/data/usaStates.js';
import departments from '../../assets/data/wealthHealthDepts.js';
import './EmployeeCreationForm.scss';
import { unwrapResult } from '@reduxjs/toolkit';
import MonthIcon from '../IconsComponents/MonthIcon.jsx';
import CustomSelect2 from '../CustomSelect2/CustomSelect2.jsx';
import CEFormElement from '../CEFormElement/CEFormElement.jsx';

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

    const formatDate = (date, format) => {
        if (!date) return '';
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();

        switch (format) {
            case 'yyyy/MM/dd':
                return `${year}/${month}/${day}`;
            case 'MM/dd/yyyy':
                return `${month}/${day}/${year}`;
            case 'dd/MM/yyyy':
                return `${day}/${month}/${year}`;
            default:
                return date;
        }
    };

    const isValidDate = (dateString) => {
        const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
        if (!regex.test(dateString)) return false;

        const parts = dateString.split('/');
        const month = parseInt(parts[0], 10);
        const day = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);

        const date = new Date(year, month - 1, day);
        return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    };

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
        validateField(name, value);
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        dispatch(setFieldsBlurred({ [name]: true }));
        validateField(name, value);
    };

    const handleDateChange = (field, date) => {
        const value = date ? formatDate(date, dateFormat) : '';
        dispatch(setFormData({ [field]: value }));
        validateField(field, value);
        handleCloseDatePicker(field);
    };

    const validateField = (fieldName, fieldValue) => {
        let errorMsg = '';

        switch (fieldName) {
            case 'firstName':
            case 'lastName':
                if (!/^[a-zA-Z]{2,}[a-zA-Z\s-]*$/.test(fieldValue)) {
                    errorMsg = 'Must contain at least 2 characters.';
                }
                break;
            case 'birthDate':
                if (!fieldValue || !isValidDate(fieldValue)) {
                    errorMsg = 'Date must be in MM/DD/YYYY format.';
                } else if (new Date(fieldValue) >= new Date(new Date().setFullYear(new Date().getFullYear() - 16))) {
                    errorMsg = 'The employee must be over 16 years old.';
                }
                break;
            case 'startDate':
                if (!fieldValue || !isValidDate(fieldValue)) {
                    errorMsg = 'The date must be valid and in MM/DD/YYYY format.';
                }
                break;
            case 'street':
            case 'city':
            case 'state':
            case 'department':
                if (!fieldValue.trim()) {
                    errorMsg = 'This field must not be empty.';
                }
                break;
            case 'zipCode':
                if (!/^\d+$/.test(fieldValue)) {
                    errorMsg = 'Must contain only numbers.';
                }
                break;
            default:
                break;
        }

        dispatch(setFieldsOnError({ [fieldName]: errorMsg }));
    };

    const isFormValid = () => {
        return Object.values(fieldsOnError).every(x => x === '') && Object.values(formData).every(x => x !== '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        if (!isFormValid()) {
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
                    disabled={!isFormValid() || isSubmitting}
                >
                    Save
                </button>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
    );
}

