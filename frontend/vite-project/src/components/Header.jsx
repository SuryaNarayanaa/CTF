import React from 'react';
import '../styles/Header.css';
import MouseTracker from './ui/MouseTracker';
import { Home } from 'lucide-react';

const Header = () => {
  const teamName = localStorage.getItem('teamName') || 'Team Name'; // Retrieve teamName from localStorage

  return (
    <div className="header">
      <div className="header-left">
        <img src="/LIGHT_BANNER_TRANSP.png" alt="flag icon" className="flag-icon" style={{ width: '160px', height: '50px' }} /> 
        <img src="/chess_pattern_vertical.png" alt="split icon"  style={{ width: '10px', height: '60px' }} /> 
        
        <button 
          onClick={() => window.location.href = '/'}
          className="home-button bg-white">
          <Home />
        </button>
        <h3><b>{teamName}</b></h3>
        <h5 className='space'>'s space</h5>
      </div>    

      <div className="header-center">
        <div className="title-container">
          <img src="/TIMER.gif" alt="left logo" className="flag-icon"  style={{ width: '60px', height: '50px' }} />
          <h1 className="title font-[''Press_Start_2P'']">HiddenX!</h1>
          <img src="/TIMER.gif" alt="right logo" className="flag-icon"  style={{ width: '60px', height: '50px' }} />
        </div>
      </div>

      <div className="header-right">
        <MouseTracker />
        <button className="cyber-button">Rules</button>
        <button className="cyber-button">FAQ</button>
      </div>
    </div>
  );
};

export default Header;