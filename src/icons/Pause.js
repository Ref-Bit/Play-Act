import React from 'react';

export default function Pause() {
  return (
    <svg
      width="50"
      height="50"
      fill="none"
      className="text-gray-900 dark:text-white hover:text-lime-400 transition duration-300"
    >
      <circle
        className=""
        cx="25"
        cy="25"
        r="20"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M18 16h4v18h-4V16zM28 16h4v18h-4z" fill="currentColor" />
    </svg>
  );
}
