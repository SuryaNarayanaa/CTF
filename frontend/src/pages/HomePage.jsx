/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Boxes } from '../components/ui/background-boxes';
import '../styles/HomePage.css';
import GifElement from '../components/ui/GifElement';
import { logout as logoutAPI } from '../api/auth';
import { AuthModal } from '../components/auth/AuthModal';
import { LoginForm } from '../components/auth/LoginForm.jsx';
import { RegisterForm } from '../components/auth/RegisterForm.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/slices/authSlice';


const userQueryFn = async () => {
  try {
    const response = await fetch("/back/user/getCurrentUser", {
      method: 'GET',
      credentials: 'include'
    });
    if (!response.ok) return null;
    const result = await response.json();
    console.log("User data received:", result);
    return result.success ? result.data : null;
  } catch (err) {
    console.error("Error fetching user:", err);
    return null;
  }
};

export const loader = (queryClient) => async () => {
  return queryClient.ensureQueryData({ queryKey: ["user"], queryFn: userQueryFn });
};

const HomePage = () => {
  console.log("Rendering HomePage");
  const loaderUser = useLoaderData(); 
  const queryClient = useQueryClient();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showFaqOverlay, setShowFaqOverlay] = useState(false);
  const [showRulesOverlay, setShowRulesOverlay] = useState(false);
  const [expandedRulesQuestion, setExpandedRulesQuestion] = useState(null);
  const [expandedFaqQuestion, setExpandedFaqQuestion] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { data:userData,isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: userQueryFn,
    onSuccess: (data) => {
      if (data) {
        dispatch(login(data));
      } else {
        dispatch(logout());
      }
    },
    onError: () => {
      dispatch(logout());
    },
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 300000
  });

  const isLoggedIn = Boolean(userData);

  useEffect(() => {
    if (loaderUser) {
      queryClient.setQueryData(["user"], loaderUser);
      dispatch(login(loaderUser));
    } else {
      dispatch(logout());
    }
  }, [loaderUser, queryClient, dispatch]);

  const handleLogout = async () => {
    try {
      await logoutAPI();  
      dispatch(logout());
      queryClient.invalidateQueries(["user"]);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) return <></>;

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

      <div
        className="absolute transform -translate-x-1/2 flex space-x-4 z-10"
        style={{
          top: '58%',
          left: '50%',
          transform: 'translate(-50%, -35%)',
          maxHeight: '100%',
          maxWidth: '100%',
        }}
      >
        <div className="cta-buttons">
          {isLoggedIn ? (
            <>
              <button
                onClick={handleLogout}
                className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 font-['Press_Start_2P']"
              >
                Log Out
              </button>
              <button
                onClick={() => navigate('/leaderboard')}
                className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 font-['Press_Start_2P']"
              >
                → Leaderboard
              </button>
              <button
                onClick={() => navigate('/challenges')}
                className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 font-['Press_Start_2P']"
              >
                → Challenges
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  console.log("Opening login modal");
                  setShowLoginModal(true);
                }}
                className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 font-['Press_Start_2P']"
              >
                Login
              </button>
              <button
                onClick={() => {
                  console.log("Opening register modal");
                  setShowRegisterModal(true);
                }}
                className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-black text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 font-['Press_Start_2P']"
              >
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
        <LoginForm onClose={() => setShowLoginModal(false)} />
      </AuthModal>

      <AuthModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        title="Register"
      >
        <RegisterForm onClose={() => setShowRegisterModal(false)} />
      </AuthModal>

      <GifElement position="top-left" path="GLITCH.gif" />
      <GifElement position="top-right" path="GLITCH-2.gif" />

      {/* Updated Buttons Container with Corner Markers Only */}
      <div
        className="absolute flex flex-col space-y-3"
        style={{
          top: '50%',
          right: '10%',
          transform: 'translateY(-50%)'
        }}
      >
        <div className="relative p-6 font-['Press_Start_2P'] bg-transparent">
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-black text-black font-bold"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-black text-black font-bold"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-black text-black font-bold"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-black text-black font-bold"></div>
          <div className="flex flex-col items-start justify-center space-y-2">
            <button 
              onClick={() => setShowRulesOverlay(true)}
              className="text-black hover:underline w-full text-left bg-transparent"
            >
              Rules
            </button>
            <button 
              onClick={() => setShowFaqOverlay(true)}
              className="text-black hover:underline w-full text-left bg-transparent"
            >
              FAQ
            </button>
          </div>
        </div>
      </div>
      
{/* FAQ Overlay */}
{showFaqOverlay && (
  <div className="fixed inset-0 z-50 flex">
    <div className="w-3/4 md:w-1/2 lg:w-2/5 bg-white h-full overflow-auto border-r-2 border-black shadow-lg bg-transparent">
      <div className="flex justify-between items-center p-4 border-b border-black">
        <div className="flex flex-col">
          <h1 className="text-xl md:text-3xl font-['Press_Start_2P'] tracking-wider text-black">FAQ</h1>
          <div className="h-1 w-full bg-lime-400 mt-2"></div>
        </div>
        <button 
          onClick={() => setShowFaqOverlay(false)}
          className="text-3xl font-['Press_Start_2P'] p-2 text-white"
        >
          ×
        </button>
      </div>
      
      <div className="p-4">
        <div className="max-w-3xl">
          {[
            {
              id: 'what-is-ctf',
              question: 'What is the CTF?',
              answer: ' An online jeopardy-CTF competition, and a different on-site contest open only to the top 8 teams of the online jeopardy-CTF competition. "Capture The Flag" (CTF) competitions are not related to running outdoors or playing first-person shooters. Instead, they consist of a set of computer security puzzles (or challenges) involving reverse-engineering, memory corruption, cryptography, web technologies, and more. When players solve them they get a "flag", a secret string which can be exchanged for points. The more points a team earns, the higher up it moves in rank.'
            },
            {
              id: 'what-is-the-prize',
              question: 'What is the prize?',
              answer: 'Prizes include cash rewards, exclusive merchandise, and invitations to the on-site finals for the top-performing teams.'
            },
            {
              id: 'how-does-it-work',
              question: 'How does it work?',
              answer: 'Teams register, compete to solve challenges, and earn points by submitting flags. The competition runs for 48 hours, with teams from all over the world participating remotely.'
            },
            {
              id: 'where-can-i-ask-a-question',
              question: 'Where can I ask a question?',
              answer: 'You can ask questions through our Discord channel, official forum, or by emailing the organizers directly at support@ctf-example.com.'
            }
          ].map((item) => (
            <div key={item.id} className="mb-6 border-b border-gray-200 pb-4">
              <button 
                className="w-full text-left flex items-start font-['Press_Start_2P'] text-sm mb-2 text-black hover:text-black bg-transparent"
                onClick={() => setExpandedFaqQuestion(expandedFaqQuestion === item.id ? null : item.id)}
              >
                <span className="mr-2 inline-block transform transition-transform" style={{
                  transform: expandedFaqQuestion === item.id ? 'rotate(90deg)' : 'rotate(0)'
                }}>
                  ▶
                </span>
                {item.question}
              </button>
              
              {expandedFaqQuestion === item.id && (
                <div className="pl-6 font-mono text-xs leading-relaxed whitespace-pre-wrap text-black">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    <div 
      className="flex-grow bg-black bg-opacity-50" 
      onClick={() => setShowFaqOverlay(false)}
    ></div>
  </div>
)}

{/* Rules Overlay */}
{showRulesOverlay && (
  <div className="fixed inset-0 z-50 flex">
    <div className="w-3/4 md:w-1/2 lg:w-2/5 bg-white h-full overflow-auto border-r-2 border-black shadow-lg bg-transparent">
      <div className="flex justify-between items-center p-4 border-b border-black bg-transparent">
        <div className="flex flex-col">
          <h1 className="text-xl md:text-3xl font-['Press_Start_2P'] tracking-wider text-black">Rules</h1>
          <div className="h-1 w-full bg-lime-400 mt-2"></div>
        </div>
        <button 
          onClick={() => setShowRulesOverlay(false)}
          className="text-3xl font-['Press_Start_2P'] p-2 text-white"
        >
          ×
        </button>
      </div>
      
      <div className="p-4">
        <div className="max-w-3xl">
          {[
            {
              id: 'rule-sharing',
              question: 'Do not share flags or solutions with other participants.',
              answer: 'Sharing flags or solutions compromises the integrity of the competition. All participants are expected to solve challenges independently.'
            },
            {
              id: 'rule-infrastructure',
              question: 'Do not attempt to attack or disrupt the CTF infrastructure.',
              answer: 'Focus on solving the challenges, not attacking the platform itself. Any attempts to disrupt service or gain unauthorized access to the infrastructure will result in disqualification.'
            },
            {
              id: 'rule-brute-force',
              question: 'Brute-forcing flag submission endpoints is not allowed.',
              answer: 'Automated tools that submit multiple flag attempts in rapid succession are prohibited. This includes scripts designed to guess flag formats.'
            },
            {
              id: 'rule-formatting',
              question: 'Flags should be submitted exactly as found, including any formatting.',
              answer: 'Pay attention to letter case, special characters, and whitespace when submitting flags. Flags must be submitted in the exact format they are discovered.'
            },
            {
              id: 'rule-bugs',
              question: 'If you encounter any bugs, please report them to the organizers.',
              answer: 'Help us improve by reporting any bugs or unexpected behaviors. Reports should be sent to the designated contact channel, not shared publicly.'
            }
          ].map((item) => (
            <div key={item.id} className="mb-6 border-b border-gray-200 pb-4">
              <button 
                className="w-full text-left flex items-start font-['Press_Start_2P'] text-xs mb-2 text-black hover:text-black bg-transparent"
                onClick={() => setExpandedRulesQuestion(expandedRulesQuestion === item.id ? null : item.id)}
              >
                <span className="mr-2 inline-block transform transition-transform" style={{
                  transform: expandedRulesQuestion === item.id ? 'rotate(90deg)' : 'rotate(0)'
                }}>
                  ▶
                </span>
                {item.question}
              </button>
              
              {expandedRulesQuestion === item.id && (
                <div className="pl-6 font-mono text-xs leading-relaxed whitespace-pre-wrap text-black">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    <div 
      className="flex-grow bg-black bg-opacity-50" 
      onClick={() => setShowRulesOverlay(false)}
    ></div>
  </div>
)}
      <GifElement position="bottom-right" path="GLITCH-3.gif" />
    </>
  );
};

export default HomePage;
