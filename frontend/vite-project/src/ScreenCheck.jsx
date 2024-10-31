import React, { useState, useEffect } from 'react';
import App from './App.jsx';

const ScreenCheck = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 920);

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

  if (!isDesktop) {
    return (
      <div 
        style={{
          fontFamily: "'Press Start 2P', cursive",
          backgroundColor: '#000',
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
        <h1 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
          📱 Mobile View Limited
        </h1>
        <p style={{ fontSize: '1rem', maxWidth: '300px' }}>
          This application is best viewed on laptops and desktops.
        </p>
        <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
          Please switch to a larger screen for the full experience.
        </p>
      </div>
    );
  }

  return <App />;
};

export default ScreenCheck;