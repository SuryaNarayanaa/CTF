import React, { useEffect, useState } from 'react';
import { BackgroundBeams } from '../components/ui/background-beams';
import { Boxes } from '../components/ui/background-boxes';
import './HomePage.css';
import GifElement from '../components/Gifelement';
import axios from 'axios';
import {logout , login  , signup} from '../api/auth';
import {
  Shield, 
  Trophy, 
  ScrollText, 
  HelpCircle,
  Users,
  Flag
} from 'lucide-react';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for a token on component mount to update login status
  useEffect(() => {
    document.body.style.backgroundImage = "url('bg.png')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';

    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Login handler
  const handleLogin = async () => {
    try {
      login({
        "email" : "3-2", 
        "password"  :"urtwe87ftgwss" });
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      logout();
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <div className="">
        <img 
          src="LOGO.gif"
          alt="Flag Logo"
          className="absolute"
          style={{
            top: '31%', 
            left: '50%',
            transform: 'translate(-50%, -35%)', 
            height: '37%', 
            width: 'auto', 
            maxHeight: '100%', 
            maxWidth: '100%', 
          }}
        />
      </div>
      
      <div className="flex items-center justify-center min-h-screen">
        <div className="absolute z-1/2">
          <Boxes />
        </div>
      </div>
  
      {/* Button Container */}
      <div className="absolute transform -translate-x-1/2 flex space-x-4 z-10"
        style={{
          top: '58%', 
          left: '50%',
          transform: 'translate(-50%, -35%)', 
          maxHeight: '100%', 
          maxWidth: '100%', 
        }}>
        <div className="cta-buttons">
          {isLoggedIn ? (
            <>
              <button 
                onClick={handleLogout}
                className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 font-['Press_Start_2P']">
                Log Out
              </button>
              <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 font-['Press_Start_2P']">
                → Scoreboard
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={handleLogin}
                className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 font-['Press_Start_2P']">
                Login
              </button>
              <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 font-['Press_Start_2P']">
                Register
              </button>
            </>
          )}
        </div>
      </div>

      <GifElement 
        position="top-right" 
        path="GLITCH.gif" 
      />

      <GifElement 
        position="top-left" 
        path="GLITCH-2.gif" 
      />
      <GifElement 
        position="bottom-right" 
        path="GLITCH-3.gif" 
      />
    </>
  );
};

export default HomePage;
