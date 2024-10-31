import React, { useEffect, useState } from 'react';
import { BackgroundBeams } from '../components/ui/background-beams';
import { Boxes } from '../components/ui/background-boxes';
import './HomePage.css';
import GifElement from '../components/Gifelement';
import { logout } from '../api/auth';
import { AuthModal, LoginForm, RegisterForm } from '../components/authmodels';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  useEffect(() => {
  
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleChallenge = async () => 
    {  
      window.location.href = '/challenges';}

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
              <button onClick={handleChallenge} className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 font-['Press_Start_2P']">
                → Challenges
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setShowLoginModal(true)}
                className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 font-['Press_Start_2P']">
                Login
              </button>
              <button 
                onClick={() => setShowRegisterModal(true)}
                className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 font-['Press_Start_2P']">
                Register
              </button>
            </>
          )}
        </div>
      </div>

      <AuthModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        title="Login"
      >
        <LoginForm 
          onClose={() => setShowLoginModal(false)}
          onSuccess={() => setIsLoggedIn(true)}
        />
      </AuthModal>

      <AuthModal 
        isOpen={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)}
        title="Register"
      >
        <RegisterForm 
          onClose={() => setShowRegisterModal(false)}
        />
      </AuthModal>

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