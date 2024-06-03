// src/TextEditor.js
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const url = process.env.REACT_APP_API_BASE_URL

const TextEditor = () => {
  const [editableText, setEditableText] = useState('This is the editable text.');
  const [submittedText, setSubmittedText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const textBlockRef = useRef(null);


  const handleTextChange = (e) => {
    setEditableText(e.target.value);
  };

  const handleSubmit = async () => {
    setSubmittedText(editableText);
    console.log('Text submitted!');

    try {
      const response = await axios.post(`${url}submit-text`, { text: editableText });
      setResponseText(response.data.generatedText); // Adjust based on the API response structure
      setDisplayedText(''); // Reset displayed text for new response
    } catch (error) {
      console.error('Error submitting text:', error);
    }

    if (window.innerWidth <= 768) { // Check if the device width is mobile size
      textBlockRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (responseText) {
      let currentIndex = -1;
      const intervalId = setInterval(() => {
        if (currentIndex < responseText.length-1) {
          setDisplayedText((prev) => prev + responseText[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(intervalId);
        }
      }, 10); // Adjust the interval time as needed for the typewriter effect

      return () => clearInterval(intervalId);
    }
  }, [responseText]);

  return (
    <div className="flex flex-col h-[85vh]">
      <div className="md:flex-grow md:flex">
        <div className="md:w-1/2 p-4 md:border-r dark:border-gray-700">
          <textarea
            className="w-full h-[40vh] md:h-[75vh] p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={editableText}
            onChange={handleTextChange}
          />
        </div>
        <div className="md:hidden flex justify-center p-4 border-t dark:border-gray-700">
          <button
            className="py-2 px-8 text-2xl rounded bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
            onClick={handleSubmit}
          >
            Submit Text
          </button>
        </div>
        <div className="md:w-1/2 p-4">
          <div
            ref={textBlockRef}
            className="w-full h-[40vh] md:h-[75vh] p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {displayedText || 'This is the non-editable text.'}
          </div>
        </div>
      </div>
      <div className="hidden md:flex justify-center p-4 border-t dark:border-gray-700">
        <button
          className="py-2 px-8 text-2xl rounded bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
          onClick={handleSubmit}
        >
          Submit Text
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
