import React from 'react';

export default function LeftIcon(
  {
    className = 'leftIcon',
    width = 24,
    height = 24,
    fillColor = 'currentColor'
  }) {
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
      <path d="M1.14 0.249v1.062c0 0.03 -0.039 0.051 -0.066 0.027L0.438 0.819c-0.024 -0.018 -0.024 -0.057 0 -0.075L1.074 0.219c0.027 -0.021 0.066 -0.003 0.066 0.03"
        fill={fillColor}
      />
    </svg>
  );
}
