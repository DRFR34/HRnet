/**
 * Formats a date according to the specified format.
 *
 * @param {Date|string} date - The date to format.
 * @param {string} format - The format string (e.g., 'yyyy/MM/dd', 'MM/dd/yyyy', 'dd/MM/yyyy').
 * @returns {string} The formatted date string.
 */
export const formatDate = (date, format) => {
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

/**
 * Validates if a date string is in the format MM/DD/YYYY.
 *
 * @param {string} dateString - The date string to validate.
 * @returns {boolean} True if the date is valid, otherwise false.
 */
export const isValidDate = (dateString) => {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (!regex.test(dateString)) return false;

    const parts = dateString.split('/');
    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
};

/**
 * Validates a form field value based on the field name.
 *
 * @param {string} fieldName - The name of the field to validate.
 * @param {string} fieldValue - The value of the field to validate.
 * @returns {string} The error message if the field is invalid, otherwise an empty string.
 */
export const validateField = (fieldName, fieldValue) => {
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
                errorMsg = 'Date must be valid and in MM/DD/YYYY format.';
            } else if (new Date(fieldValue) >= new Date(new Date()
                .setFullYear(new Date()
                    .getFullYear() - 16))) {
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
            if (!fieldValue.trim()) {//remove leading and trailing spaces
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

    return errorMsg;
};

/**
 * Checks if the entire form is valid based on fields with errors and form data.
 *
 * @param {Object} fieldsOnError - An object where keys are field names and values are error messages.
 * @param {Object} formData - An object where keys are field names and values are field values.
 * @returns {boolean} True if the form is valid, otherwise false.
 */
export const isFormValid = (fieldsOnError, formData) => {
    return (
        fieldsOnError &&
        formData &&
        Object.values(fieldsOnError).every((x) => x === '') &&
        Object.values(formData).every((x) => x !== '')
    );
};
