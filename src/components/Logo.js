// src/components/Logo.js
import React from 'react';

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-12 h-12 text-blue-500 dark:text-blue-400"
  >
    <circle cx="50" cy="50" r="45"/>
    <path d="M50 15L58 35 80 40 60 55 65 80 50 65 35 80 40 55 20 40 42 35 50 15z"/>
  </svg>
);

export default Logo;
