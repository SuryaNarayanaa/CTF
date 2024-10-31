import React, { useState, useEffect } from 'react';
import App from './App.jsx';

// Random characters generated above
const randomCharacters = 'ꞝˡϰʭʊⱿ͡ˤǓǪǮǕǨʜɀꞚȼⱸⱥǰϴʰʱϺǦǑꞕˇǢǬꜤǛˀǍꞟϱϮꞪⱷꞢꞤʮꞠϨʤꞔȺǙǞⱣ';

const ScreenCheck = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 920);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 920);
    };

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    // Cleanup listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Character reveal effect
  useEffect(() => {
    if (!isDesktop) {
      let index = 0;

      const intervalId = setInterval(() => {
        if (index < randomCharacters.length) {
          setDisplayedText((prev) => prev + randomCharacters[index]);
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, 100); // Adjust speed here

      return () => clearInterval(intervalId);
    }
  }, [isDesktop]); // Run when isDesktop changes

  if (!isDesktop) {
    return (
      <div 
        style={{
          fontFamily: 'Digital, monospace', /* Ensures the retro feel */
          color: '#fff',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '20px'
        }}
      >
        <h1 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'black' }}>
          📱 Mobile View Limited
        </h1>
        <p style={{ fontSize: '1rem', maxWidth: '300px', color: 'black' }}>
          {displayedText}
        </p>
        <p style={{ fontSize: '0.9rem', marginTop: '10px', color: 'black' }}>
            The Site is Custom made for Laptops and Desktops
            <br />
          Please switch to a larger screen for the full experience.
        </p>
        <img src = "/RED_FLAG.gif" alt="Flag Logo" style={{height: '25%', width: 'auto', maxHeight: '100%', maxWidth: '100%',}}/>
      </div>
    );
  }

  return <App />;
};

export default ScreenCheck;
