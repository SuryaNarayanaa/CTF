import React from 'react';
import '../styles/Header.css'; // Assuming you have a CSS file for styling
import MouseTracker from './ui/MouseTracker';

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <img src="/LIGHT_BANNER_TRANSP.png" alt="flag icon" className="flag-icon" />
        <div className="ctf-title">
          <h1 className="title">theeyesctf</h1>
          <p className="team-info">Logout Team</p>
          
        </div>
      </div>
      
      <div className="header-center">
        
        
      </div>

      <div className="header-right">
        
        <div className="ctf-info">
         <MouseTracker />
        </div>
        
      </div>
    </div>
  );
};

export default Header;