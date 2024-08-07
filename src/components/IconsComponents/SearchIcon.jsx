import React from 'react';

export default function SearchIcon({ className = 'searchIcon', color = 'currentColor', width = 24, height = 24, strokeWidth = 2 }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
    >
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth={strokeWidth} fill="none" />
      <line x1="16.65" y1="16.65" x2="22" y2="22" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}






