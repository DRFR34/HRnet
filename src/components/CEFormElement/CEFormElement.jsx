import React from 'react';
import { useSelector } from 'react-redux';
import ErrorSpan from '../ErrorSpan/ErrorSpan';
export default function CEFormElement({
  labClassName,
  labHtmlFor,
  errorFieldName,
  children
}) {
  const { fieldsBlurred, fieldsOnError } = useSelector(state => state.createEmployee);

  return (
    <div className='form__fieldset__element'>
      <label
        className={labClassName}
        htmlFor={labHtmlFor}
      >
        {labHtmlFor.charAt(0).toUpperCase() + labHtmlFor.slice(1)}
      </label>

      {children}

      {fieldsBlurred[errorFieldName] && <ErrorSpan message={fieldsOnError[errorFieldName]} />}
    </div>
  );
}
