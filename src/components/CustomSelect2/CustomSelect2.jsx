import './CustomSelect2.scss';
import React, { useState, useRef, useEffect } from 'react';
import ChevronDownIcon from '../IconsComponents/ChevronDownIcon';

export default function CustomSelect2({
  id,
  name,
  className,
  value,
  onChange,
  onBlur,
  children,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const selectRef = useRef(null);


  const handleOptionClick = (optionValue) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    if (onChange) {
      const event = {
        target: {
          name,
          value: optionValue,
        },
      };
      onChange(event);
    }
  };


  const handleBlur = (event) => {   
    if (selectRef.current && !selectRef.current.contains(event.relatedTarget)) {
      setIsOpen(false);
      if (onBlur) {
        const blurEvent = {
          target: {
            name,
            value: selectedValue,
          },
        };
        onBlur(blurEvent);
      }
    }
  };


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

 
  useEffect(() => {
    setSelectedValue(value);
  }, [value]);


  const selectedOptionLabel = React.Children.toArray(children).find(
    (child) => child.props.value === selectedValue
  )?.props.children || 'Choose an option';

  return (
    <div
      id={id}
      className={className ? `${className} customSelect2` : 'customSelect2'}
      ref={selectRef}
      tabIndex={0}
      onBlur={handleBlur}
    >
      <div
        className={`customSelect2__toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOptionLabel}
      </div>
      <div
      className={`customSelect2__toggle__icon ${isOpen ? 'open' : ''}`}
      onClick={() => setIsOpen(!isOpen)}
       >
         <ChevronDownIcon/>
      </div>
     
      {isOpen && (
        <div className="customSelect2__options">
          {React.Children.map(children, (child) => (
            <div
              key={child.props.value}
              className={`customSelect2__options__option ${child.props.value === selectedValue ? 'selected' : ''}`}
              onClick={() => handleOptionClick(child.props.value)}
            >
              {child.props.children}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
