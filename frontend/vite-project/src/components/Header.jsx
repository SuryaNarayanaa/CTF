import React from 'react';
import '../styles/Header.css';
import MouseTracker from './ui/MouseTracker';
import { Home } from 'lucide-react';

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <img src="/LIGHT_BANNER_TRANSP.png" alt="flag icon" className="flag-icon" style={{ width: '160px', height: '50px' }} />  
        <h2>Team Name</h2>
        <button 
          onClick={() => window.location.href = '/'}
          className="home-button bg-white">
          <Home />
        </button>
      </div>    

      <div className="header-center">
        <h1 className="title font-['Press_Start_2P']">HiddenX!</h1>
      </div>

      <div className="header-right">
        <button className="cyber-button">Rules</button>
        <button className="cyber-button">FAQ</button>
        <MouseTracker />
      </div>
    </div>
  );
};

export default Header;
