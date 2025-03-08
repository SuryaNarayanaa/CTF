import React, { useEffect, useState } from 'react';
import '../styles/Header.css';
import MouseTracker from './ui/MouseTracker';
import io from 'socket.io-client';

const socket = io('http://localhost:3000', { transports: ['websocket'], autoConnect: true });

const Header = ({ team_name, userId }) => {
  const teamName = team_name || "TeamName";

  // Retrieve stored values from localStorage on mount
  const [rank, setRank] = useState(() => localStorage.getItem(`rank_${userId}`) || "-");
  const [flags, setFlags] = useState(() => Number(localStorage.getItem(`flags_${userId}`)) || 0);

  useEffect(() => {
    // Ensure rank and flags are updated on component mount
    setRank(localStorage.getItem(`rank_${userId}`) || "-");
    setFlags(Number(localStorage.getItem(`flags_${userId}`)) || 0);

    const handleUserRank = (userrank) => {
      console.log("Leaderboard update received:", userrank);

      if (userrank.userId === userId) {
        setRank(userrank.rank);
        setFlags(userrank.flag);

        // Store updated values in localStorage
        localStorage.setItem(`rank_${userId}`, userrank.rank);
        localStorage.setItem(`flags_${userId}`, userrank.flag);
      }
    };

    socket.on('Userrank', handleUserRank);

    return () => {
      socket.off('Userrank', handleUserRank);
    };
  }, [userId]); // Runs again only if userId changes

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
            <h5>Rank: {rank}</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
