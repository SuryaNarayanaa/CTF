import React from 'react';
import '../styles/Header.css'; // Assuming you have a CSS file for styling

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <img src="/FLAG_LOGO.gif" alt="flag icon" className="flag-icon" />
        <div className="ctf-title">
          <h1 className="title">theeyesctf</h1>
          <p className="team-info">Logout Team</p>
          <p className="google-link">Opportunities at <span className="google">Google</span></p>
        </div>
      </div>
      
      <div className="header-center">
        <div className="ascii-box">ASCII Art Here</div>
      </div>

      <div className="header-right">
        <div className="announcements">
          <span>ANNOUNCEMENTS</span>
          <span>(0)</span>
        </div>
        <div className="ctf-info">
          <p>60.65</p>
          <p>27.61</p>
        </div>
        <div className="status">
          <p>CTF Closed</p>
          <p>31/10/2024</p>
        </div>
      </div>
    </div>
  );
};

export default Header;