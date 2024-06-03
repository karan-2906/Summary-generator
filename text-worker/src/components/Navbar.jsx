// src/Navbar.js
import React from 'react';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className={`p-4 border-b ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-100 border-gray-300'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <span className={darkMode ? 'text-white' : 'text-black'}>AI Summary Generator</span>
        </div>
        <button
          className={`py-2 px-4 rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
          onClick={toggleDarkMode}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
