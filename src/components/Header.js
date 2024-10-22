// src/components/Header.js
import React from 'react';
import Logo from './Logo';

const Header = () => {
  return (
    <header className="bg-white dark:bg-black bg-opacity-90 dark:bg-opacity-90 fixed w-full z-10 transition-colors duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-center items-center">
        <Logo />
      </div>
    </header>
  );
};

export default Header;