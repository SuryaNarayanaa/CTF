import React, { useEffect, useState } from 'react';
import { useNavigate,useLoaderData } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { Boxes } from '../components/ui/background-boxes';
import '../styles/HomePage.css';
import GifElement from '../components/ui/GifElement';
import { logout } from '../api/auth';
import { AuthModal } from '../components/auth/AuthModal';
import { LoginForm } from '../components/auth/LoginForm.jsx';
import { RegisterForm } from '../components/auth/RegisterForm.jsx';


export const loader = (queryClient) => async() =>{
  return queryClient.fetchQuery("user", async () => {
    const response = await fetch("/back/user/getCurrentUser", { 
      method: "GET", 
      credentials: "include"
    });
    if (!response.ok) {
      return null;
    }
    const result = await response.json();
    return result.success ? result.data : null;
  });
}


const HomePage = () => {
  console.log("Rendering HomePage");
  const loaderUser = useLoaderData(); // Data fetched by homeLoader
  const queryClient = useQueryClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();



  const { data, error,isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await fetch("/back/user/getCurrentUser", { 
          method: 'GET', 
          credentials: 'include'
        });
        
        if (!response.ok) {
          return null;
        }
        
        const result = await response.json();
        console.log("User data received:", result);
        return result.success ? result.data : null;
      } catch (err) {
        console.error("Error fetching user:", err);
        return null;
      }
    },
    onSuccess: (data) => {
      if (data) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    },
    onError: (err) => {
      setIsLoggedIn(false);
    },
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 300000 // 5 minutes
  });

  useEffect(() => {
    if (loaderUser) {
      queryClient.setQueryData("user", loaderUser);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [loaderUser, queryClient]);

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

  if(isLoading) return <></>

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