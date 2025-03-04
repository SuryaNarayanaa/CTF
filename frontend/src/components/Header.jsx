import React, { useState } from 'react';
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

const Header = ({team_name}) => {
  const [showRules, setShowRules] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const teamName = team_name || 'Team Name';

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
            <h1 className="title font-[''Press_Start_2P'']">HiddenX!</h1>
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
          <button className="cyber-button" onClick={() => setShowRules(true)}>Rules</button>
          <button className="cyber-button" onClick={() => setShowFAQ(true)}>FAQ</button>
        </div>
      </div>

      <Modal isOpen={showRules} onClose={() => setShowRules(false)} title="Event Rules">
        <div className="rules-content">
          <h3>1. Individual Challenge:</h3>
          <ul>
            <li>You will participate individually in a series of challenges.</li>
            <li>Each category will have specific objectives.</li>
          </ul>
          
          <h3>2. Challenge Unlock:</h3>
          <ul>
            <li>Challenges will be unlocked sequentially.</li>
            <li>To unlock a new challenge, you must complete a fun, interactive task.</li>
          </ul>
          
          <h3>3. Challenge Completion:</h3>
          <ul>
            <li>Once a challenge is unlocked, you can attempt to solve it.</li>
            <li>You can use any resources or strategies to complete the challenge.</li>
            <li><strong>Ethical hacking and respectful behavior are mandatory.</strong></li>
          </ul>
          
          <h3>4. Point System:</h3>
          <ul>
            <li>Points will be awarded for completing challenges and unlocking new ones.</li>
            <li>The participant with the highest score at the end of the event will be declared the winner.</li>
          </ul>
        </div>
      </Modal>

      <Modal isOpen={showFAQ} onClose={() => setShowFAQ(false)} title="Frequently Asked Questions">
        <div className="faq-content">
          <h3>Q: How do I unlock a new challenge?</h3>
          <p>A: Complete the specified fun task to unlock the next challenge.</p>

          <h3>Q: Can I collaborate with other participants?</h3>
          <p>A: No, this is an individual challenge. You must work independently.</p>

          <h3>Q: What happens if I reveal the identity of the unlocker prematurely?</h3>
          <p>A: There may be penalties or restrictions.</p>

          <h3>Q: Are there any time limits for completing challenges?</h3>
          <p>A: There may be time limits for specific challenges. Please refer to the challenge guidelines.</p>

          <p className="faq-footer"><em>Remember, have fun while you compete! Good luck!</em></p>
        </div>
      </Modal>
    </>
  );
};

export default Header;