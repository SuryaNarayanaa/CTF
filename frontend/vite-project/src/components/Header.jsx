import React, { useState, useEffect } from 'react';
import { ScrollText, HelpCircle, LogOut } from 'lucide-react';
import { logout } from '../api/auth';

const Header = () => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e) => {
    if (!isMobile) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      className="w-full bg-black border-b border-gray-800 px-4 py-2 font-sans relative overflow-hidden text-green-500"
      onMouseMove={handleMouseMove}
    >
      {/* Interactive gradient follower */}
      <div
        className="hidden md:block absolute pointer-events-none blur-xl opacity-50 transition-transform duration-200 ease-out"
        style={{
          background: 'radial-gradient(circle at center, #10B981 0%, transparent 70%)',
          width: '150px',
          height: '150px',
          transform: `translate(${mousePosition.x - 75}px, ${mousePosition.y - 75}px)`,
        }}
      />

      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto relative z-10">
        {/* Logo Section */}
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-20 h-20 flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full transform transition-all duration-300 
                          group-hover:scale-110 opacity-0 group-hover:opacity-10" />
            <img
              src="/FLAG_LOGO.gif"
              alt="Logo"
              className="object-contain relative z-10 transform transition-transform duration-500 
                         group-hover:rotate-180"
            />
          </div>
        </div>

        {/* Title Section */}
        <div className="flex-1 flex justify-center overflow-hidden h-8 mx-4 relative">
          <div
            className={`text-green-400 font-['Press_Start_2P'] text-xl md:text-2xl relative
            ${isGlitching ? 'animate-glitch' : 'animate-typing'}`}
          >
            <span className="relative inline-block">
              Welcome to HiddenX!
              <span className="absolute top-0 left-0 w-full h-full text-green-600 opacity-0 
                             hover:opacity-50 transition-opacity duration-300 glitch-layer-1">
                Welcome to HiddenX!
              </span>
              <span className="absolute top-0 left-0 w-full h-full text-green-400 opacity-0 
                             hover:opacity-50 transition-opacity duration-300 glitch-layer-2">
                Welcome to HiddenX!
              </span>
            </span>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 w-full md:w-auto">
          {/* Rules Button */}
          <div className="relative group">
            <button className="flex items-center px-4 py-2 rounded-md text-sm font-['Press_Start_2P'] 
                             bg-grey-500
                             hover:from-green-50 hover:to-green-100
                             transition-all duration-300
                             transform hover:scale-105 active:scale-95
                             shadow-[0_2px_10px_rgba(16,185,129,0.1)]
                             hover:shadow-[0_4px_20px_rgba(16,185,129,0.2)]
                             border border-gray-800 hover:border-green-200
                             text-gray-200 hover:text-green-400">
              <ScrollText className="w-4 h-4 mr-2 transform group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative overflow-hidden inline-block">
                <span className="inline-block group-hover:translate-y-[-100%] transition-transform duration-300">
                  Rules
                </span>
                <span className="absolute left-0 top-0 translate-y-[100%] group-hover:translate-y-0 
                               transition-transform duration-300 text-green-400">
                  Rules
                </span>
              </span>
            </button>
            {/* Rules Tooltip */}
           
          </div>

          
          <div className="relative group">
            <button className="flex items-center px-4 py-2 rounded-md text-sm font-['Press_Start_2P'] 
                             bg-grey-500
                             hover:from-green-50 hover:to-green-100
                             transition-all duration-300
                             transform hover:scale-105 active:scale-95
                             shadow-[0_2px_10px_rgba(16,185,129,0.1)]
                             hover:shadow-[0_4px_20px_rgba(16,185,129,0.2)]
                             border border-gray-800 hover:border-green-200
                             text-white hover:text-green-400">
              <HelpCircle className="w-4 h-4 mr-2 transform group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative overflow-hidden inline-block">
                <span className="inline-block group-hover:translate-y-[-100%] transition-transform duration-300">
                  FAQ
                </span>
                <span className="absolute left-0 top-0 translate-y-[100%] group-hover:translate-y-0 
                               transition-transform duration-300 text-green-400">
                  FAQ
                </span>
              </span>
            </button>
            {/* FAQ Tooltip */}
            
          </div>
        </div>
      </div>

      {/* Enhanced Animations */}
      <style>{`
        @keyframes typing {
          0%, 100% { width: 0 }
          50% { width: 100% }
        }

        @keyframes glitch {
          0%, 100% { transform: translate(0) skew(0deg); }
          20% { transform: translate(-2px, 2px) skew(2deg); }
          40% { transform: translate(-2px, -2px) skew(-2deg); }
          60% { transform: translate(2px, 2px) skew(2deg); }
          80% { transform: translate(2px, -2px) skew(-2deg); }
        }

        .animate-typing {
          overflow: hidden;
          border-right: 2px solid #10B981;
          white-space: nowrap;
          animation: typing 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .animate-glitch {
          animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
        }

        .glitch-layer-1 {
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
          transform: translate(-2px, 2px);
        }

        .glitch-layer-2 {
          clip-path: polygon(0 80%, 100% 20%, 100% 100%, 0 100%);
          transform: translate(2px, -2px);
        }

        @media (max-width: 768px) {
          .animate-typing {
            animation: typing 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
        }
      `}</style>
    </div>
  );
};

export default Header;
