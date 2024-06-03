import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TextEditor from './components/TextEditor';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className={`h-[93vh] ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <TextEditor />
      </div>
    </div>
  );
}

export default App;
