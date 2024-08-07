import React, { useState, useEffect, useRef } from 'react';
import './CustomSelect.scss';
import UpDownIcon from '../IconsComponents/UpDownIcon';

export default function CustomSelect({
  options,
  onOptionSelected,
  selectedOption,
  triggerStyle = {},
  optionsListStyle = {},
  optionStyle = {},
  arrowsStyle = {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onOptionSelected(option);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className={`customSelect `}>
      <div
        className={`customSelect__trigger `}
        style={triggerStyle}
        onClick={toggleOptions}
      >
        <div className='customSelect__trigger__text'>
          {selectedOption}
        </div>
        <div 
        className="customSelect__trigger__arrows"
        style={arrowsStyle}
        >
          <UpDownIcon 
            className="customSelect__trigger__arrows__upDownicon"/>
        </div>
      </div>
      {isOpen && (
        <div className={`customSelect__optionsList`} style={optionsListStyle}>
          {options.map((option, index) => (
            <span
              key={index}
              className={`customSelect__optionsList__option`}
              style={optionStyle}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

