import React from 'react';

export default function CloseIcon({ className = 'closeIcon', width = 24, height = 24, strokeWidth = 2.5 }) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <g clipPath="url(#clip0_429_11083)">
          <path
            d="M7 7.00006L17 17.0001M7 17.0001L17 7.00006"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_429_11083">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </g>
    </svg>
  );
}