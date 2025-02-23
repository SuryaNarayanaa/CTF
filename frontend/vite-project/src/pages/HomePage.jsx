import React, { useEffect, useState } from 'react';
import {redirect} from 'react-router-dom'
import { Boxes } from '../components/ui/background-boxes';
import '../styles/HomePage.css';
import GifElement from '../components/Gifelement';
import { logout } from '../api/auth';
import { AuthModal, LoginForm, RegisterForm } from '../components/authmodels';
import { useNavigate } from 'react-router-dom';
import { useQuery,useQueryClient } from 'react-query';



const HomePage = () => {
  console.log("Rendering HomePage")
  const queryClient = useQueryClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();

  const { data, error } = useQuery({
    queryKey:["user"],
    queryFn: async () => {
      const response = await fetch("/api/user/getCurrentUser", { 
        method: 'GET', 
        credentials: 'include'
      });
      if (response.status !== 200) {
        // return null or throw an error so that react-query can mark this as a failure
        return null;
      }
      const { data, success } = await response.json();
      return success ? data : null;
    },
    onSuccess: (data) => {
      setIsLoggedIn(!!data);
    },
    onError: () => {
      setIsLoggedIn(false);
    }
  })


  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      queryClient.invalidateQueries(["user"]); // Invalidate user query so that it refetches
      navigate('/');
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
              <button 
                onClick={() => navigate('/leaderboard')}
                className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 font-['Press_Start_2P']">
                → Leaderboard
              </button>
              <button 
                onClick={() => navigate('/challenges')}
                className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 font-['Press_Start_2P']">
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