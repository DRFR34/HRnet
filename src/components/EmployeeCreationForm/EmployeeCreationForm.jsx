import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee, showModal, setError, setIsSubmitting } from '../../redux/features/createEmployee/createEmployeeSlice.js';
import CustomDatePicker from '../CustomDatePicker/CustomDatePicker.jsx';
import usaStates from '../../assets/data/usaStates.js';
import departments from '../../assets/data/wealthHealthDepts.js';
import './EmployeeCreationForm.scss';
import { unwrapResult } from '@reduxjs/toolkit';
import ErrorSpan from '../ErrorSpan/ErrorSpan.jsx';
import MonthIcon from '../IconsComponents/MonthIcon.jsx';


export default function EmployeeCreationForm() {
    const dispatch = useDispatch();
    const { error, isSubmitting } = useSelector(state => state.createEmployee);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        startDate: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        department: '',
    });
    const [fieldsOnError, setFieldsOnError] = useState({});
    const [fieldsBlurred, setFieldsBlurred] = useState({});
    const [showDatePicker, setShowDatePicker] = useState({
        birthDate: false,
        startDate: false,
    });

    const FormatsOfDate = {
        opt1: 'yyyy/MM/dd',
        opt2: 'MM/dd/yyyy',
        opt3: 'dd/MM/yyyy',
    }
    const dateFormat = FormatsOfDate.opt2;

    const birthDateInputRef = useRef(null);
    const startDateInputRef = useRef(null);

    const formatDate = (date, format) => {
        if (!date) return '';
        const d = new Date(date);
        // padStart() adds leading 0 if the date's lenght is less than 2'
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

    const handleChange = (e) => {

        const changedFieldName = e.target.name;
        const changedFieldvalue = e.target.value;

        setFormData(prevState => ({
            ...prevState,
            [changedFieldName]: changedFieldvalue,
        }));
        validateField(changedFieldName, changedFieldvalue); // Validate the field on change
    };

    const handleBlur = (e) => {

        const blurredFieldName = e.target.name;
        const blurredFieldvalue = e.target.value;

        setFieldsBlurred(prevState => ({ ...prevState, [blurredFieldName]: true }));
        validateField(blurredFieldName, blurredFieldvalue);
    };

    const handleDateChange = (field, date) => {

        const value = date ? formatDate(date, dateFormat) : '';

        setFormData(prevFormState => ({
            ...prevFormState,
            [field]: value,
        }));
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
                if (!fieldValue || new Date(fieldValue) >= new Date(new Date().setFullYear(new Date().getFullYear() - 16))) {
                    errorMsg = !fieldValue ? 'Must contain a valid date.' : 'The employee must be over 16 years old.';
                }
                break;
            case 'startDate':
                if (!fieldValue) {
                    errorMsg = 'The date must be valid.';
                }
                break;
            case 'street':
            case 'city':
            case 'state':
            case 'department':
                if (!fieldValue.trim()) { //trim() removes leading and trailing spaces
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
        setFieldsOnError(prevErrorsState => ({
            ...prevErrorsState,
            [fieldName]: errorMsg
        }));
    };


    const isFormValid = () => {
        return Object.values(fieldsOnError).every(x => x === "") && Object.values(formData).every(x => x !== "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return; // Prevent a resubmission if already in progress

        if (!isFormValid()) {
            setFieldsBlurred({
                firstName: true,
                lastName: true,
                birthDate: true,
                startDate: true,
                street: true,
                city: true,
                state: true,
                zipCode: true,
                department: true,
            });
            return;
        }

        dispatch(setIsSubmitting(true)); // initiate submission

        try {
            const resultAction = await dispatch(createEmployee(formData));

            unwrapResult(resultAction);
            dispatch(showModal());
            setFormData({
                firstName: '',
                lastName: '',
                birthDate: '',
                startDate: '',
                street: '',
                city: '',
                state: '',
                zipCode: '',
                department: '',
            });
            setFieldsOnError({});
            setFieldsBlurred({});

        } catch (error) {
            console.error('Failed to create employee', error);
            dispatch(setError(error.toString()));

        } finally {
            dispatch(setIsSubmitting(false));
            console.log("Form submission ended.");
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

                    <div className='form__fieldset__element'>
                        <label 
                        className='form__fieldset__element__label'
                        htmlFor="firstName">First name</label>
                        <input
                            id='firstName'
                            name='firstName'
                            className={`form__fieldset__element__input ${fieldsOnError.firstName ? 'form__fieldset__element__input--onError' : ''}`}
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {fieldsBlurred.firstName && <ErrorSpan message={fieldsOnError.firstName} />}
                    </div>

                    <div className='form__fieldset__element'>
                        <label 
                        className='form__fieldset__element__label'
                        htmlFor="lastName">Last name</label>
                        <input
                            id='lastName'
                            name='lastName'
                            className={`form__fieldset__element__input ${fieldsOnError.lastName ? 'form__fieldset__element__input--onError' : ''}`}
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {fieldsBlurred.lastName && <ErrorSpan message={fieldsOnError.lastName} />}
                    </div>

                    <div className='form__fieldset__element'>
                        <label 
                        className='form__fieldset__element__label'
                        htmlFor="birthDate">Date of birth</label>
                        <div className="datePickerWrapper">
                            <input
                                id='birthDate'
                                name='birthDate'
                                className={`form__fieldset__element__input ${fieldsOnError.birthDate ? 'form__fieldset__element__input--onError' : ''}`}
                                type="text"
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
                                    selectedDate={formData.birthDate ? new Date(formData.birthDate) : new Date()}
                                    onDateChanged={(date) => handleDateChange('birthDate', date)}
                                    onClose={() => handleCloseDatePicker('birthDate')}
                                />
                            )}
                        </div>
                        {fieldsBlurred.birthDate && <ErrorSpan message={fieldsOnError.birthDate} />}
                    </div>

                </fieldset>

                <fieldset className='form__fieldset'>
                    <legend>Professional information</legend>

                    <div className='form__fieldset__element'>
                        <label 
                        className='form__fieldset__element__label'
                        htmlFor="startDate">Start date</label>
                        <div className="datePickerWrapper">
                            <input
                                id='startDate'
                                name='startDate'
                                className={`form__fieldset__element__input ${fieldsOnError.startDate ? 'form__fieldset__element__input--onError' : ''}`}
                                type="text"
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
                                    selectedDate={formData.startDate ? new Date(formData.startDate) : new Date()}
                                    onDateChanged={(date) => handleDateChange('startDate', date)}
                                    onClose={() => handleCloseDatePicker('startDate')}
                                />
                            )}
                        </div>
                        {fieldsBlurred.startDate && <ErrorSpan message={fieldsOnError.startDate} />}
                    </div>

                    <div className='form__fieldset__element'>
                        <label
                        className='form__fieldset__element__label'
                        htmlFor="department">Department</label>
                        <select
                            id='department'
                            name='department'
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
                        </select>
                        {fieldsBlurred.department && <ErrorSpan message={fieldsOnError.department} />}
                    </div>

                </fieldset>

                <fieldset className='form__fieldset'>
                    <legend>Address</legend>

                    <div className='form__fieldset__element'>
                        <label 
                        className='form__fieldset__element__label'
                        htmlFor="street">Street</label>
                        <input
                            id='street'
                            name='street'
                            className={`form__fieldset__element__input ${fieldsOnError.street ? 'form__fieldset__element__input--onError' : ''}`}
                            type="text"
                            value={formData.street}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {fieldsBlurred.street && <ErrorSpan message={fieldsOnError.street} />}
                    </div>

                    <div className='form__fieldset__element'>
                        <label 
                        className='form__fieldset__element__label'
                        htmlFor="city">City</label>
                        <input
                            id='city'
                            name='city'
                            className={`form__fieldset__element__input ${fieldsOnError.city ? 'form__fieldset__element__input--onError' : ''}`}
                            type="text"
                            value={formData.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {fieldsBlurred.city && <ErrorSpan message={fieldsOnError.city} />}
                    </div>

                    <div className='form__fieldset__element'>
                        <label 
                        className='form__fieldset__element__label'
                        htmlFor="state">State</label>
                        <select
                            id='state'
                            name='state'
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
                        </select>
                        {fieldsBlurred.state && <ErrorSpan message={fieldsOnError.state} />}
                    </div>

                    <div className='form__fieldset__element'>
                        <label 
                        className='form__fieldset__element__label'
                        htmlFor="zipCode">Zip code</label>
                        <input
                            id='zipCode'
                            name='zipCode'
                            className={`form__fieldset__element__input ${fieldsOnError.zipCode ? 'form__fieldset__element__input--onError' : ''}`}
                            type="text"
                            value={formData.zipCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {fieldsBlurred.zipCode && <ErrorSpan message={fieldsOnError.zipCode} />}
                    </div>
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
