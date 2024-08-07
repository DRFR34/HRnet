import React from 'react';

export default function MonthIcon({ width = 24, height = 24, color = 'currentColor' }) {
    return (
    <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clipPath="url(#clip0_2_19)">

            <path d="M0 3.80951C0 3.10821 0.624719 2.53967 1.39535 2.53967H22.3256C23.0962 2.53967 23.7209 3.10821 23.7209 3.80951V7.36507H0V3.80951Z" fill={color} />
            <path d="M5.16278 1.26984C5.16278 0.568527 5.78751 0 6.55813 0H7.95348C8.7241 0 9.34883 0.568527 9.34883 1.26984V4.06349H5.16278V1.26984Z" fill={color} />
            <path d="M15.2093 1.26984C15.2093 0.568527 15.834 0 16.6046 0H18C18.7706 0 19.3953 0.568527 19.3953 1.26984V4.06349H15.2093V1.26984Z" fill={color} />
            <path d="M0 21.0794H24V22.7302C24 23.4315 23.3753 24 22.6047 24H1.39535C0.62472 24 0 23.4315 0 22.7302V21.0794Z" fill={color} />
            <path d="M24 15.4921H0.279083V17.6508H24V15.4921Z" fill={color} />
            <path d="M24 8.7619H0V11.4286H24V8.7619Z" fill={color} />
            <path d="M2.93023 9.65079H0V22.7302H2.93023V9.65079Z" fill={color} />
            <path d="M10.0465 9.65079H7.11627V22.7302H10.0465V9.65079Z" fill={color} />
            <path d="M17.0232 9.65079H14.093V22.7302H17.0232V9.65079Z" fill={color} />
            <path d="M24 9.65079H21.0698V22.7302H24V9.65079Z" fill={color} />
        </g>
        <defs>
            <clipPath id="clip0_2_19">
                <rect width="24" height="24" fill="white" />
            </clipPath>
        </defs>
    </svg>
    );

}

