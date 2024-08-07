import React from 'react';

export default function RightIcon({ className = 'rightIcon', width = 24, height = 24, fillColor = 'currentColor' }) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      fill={fillColor}
      viewBox="0 0 1.56 1.56"
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 52 52"
      xmlSpace="preserve"
    >

      <path d="M0.42 1.311V0.249c0 -0.03 0.039 -0.051 0.066 -0.027l0.636 0.519c0.024 0.018 0.024 0.057 0 0.075L0.486 1.341c-0.027 0.021 -0.066 0.003 -0.066 -0.03"
        fill={fillColor}
      />
    </svg>

  );
}


