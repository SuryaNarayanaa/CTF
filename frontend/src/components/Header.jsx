import React, { useEffect, useState } from 'react';
import '../styles/Header.css';
import MouseTracker from './ui/MouseTracker';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

const Header = ({team_name, flags = 0, points = 0, userId}) => {
  const teamName = team_name || "TeamName";
  const rank = 0;  //rank logic yet to implement

  return (
    <>
      <div className="header">
        <div className="header-left">
          <img 
            src="/LIGHT_BANNER_TRANSP.png" 
            alt="flag icon" 
            className="flag-icon" 
            style={{ width: '160px', height: '50px' }} 
            onClick={() => window.location.href = '/'} 
          /> 
          <img 
            src="/chess_pattern_vertical.png" 
            alt="split icon"  
            style={{ width: '10px', height: '60px', marginRight:'20px'}} 
          /> 
          <h3><b>{teamName}</b></h3>
          <h5 className='space'>'s space</h5>
        </div>    

        <div className="header-center">
          <div className="title-container">
            <img 
              src="/TIMER.gif" 
              alt="left logo" 
              className="flag-icon"  
              style={{ width: '60px', height: '50px' }} 
            />
            <h1 className="title font-[''Press_Start_2P'']">BinaryXForge!</h1>
            <img 
              src="/TIMER.gif" 
              alt="right logo" 
              className="flag-icon"  
              style={{ width: '60px', height: '50px' }} 
            />
          </div>
        </div>

        <div className="header-right">          
          <MouseTracker />
          <div className="points-container" style={{ marginLeft: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
            <h5>Flags: {flags}</h5>
            <h5>Rank: {rank === 0 ? "-" : rank}</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;