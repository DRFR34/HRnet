import React from 'react';
import './ErrorSpan.scss';

const ErrorSpan = ({ message }) => {
    if (!message) return null;
    return <span className="error-message">{message}</span>;
};

export default ErrorSpan;
