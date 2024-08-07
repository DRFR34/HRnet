import React from 'react';

export default function DownIcon({ className = 'downIcon', width = 64, height = 64, fillColor = 'currentColor' }) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M8.728 14.795L3.728 6.795C3.1036 5.79594 3.82186 4.5 5 4.5H15C16.1781 4.5 16.8964 5.79594 16.272 6.795L11.272 14.795C10.6845 15.735 9.31552 15.735 8.728 14.795Z" />
      </g>
    </svg>
  );
}
