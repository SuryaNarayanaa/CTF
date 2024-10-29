import React, { useEffect, useState } from 'react';
import { BackgroundBeams } from '../components/ui/background-beams';
import { 
  Shield, 
  Trophy, 
  ScrollText, 
  HelpCircle,
  Users,
  Flag
} from 'lucide-react';

const HomePage = () => {
  const [glitchText, setGlitchText] = useState('');
  
  useEffect(() => {
    const chars = '01';
    const interval = setInterval(() => {
      const randomChar = chars[Math.floor(Math.random() * chars.length)];
      setGlitchText(randomChar);
    }, 200);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#0a0a0a] text-[#00ff00]">
      <div className="absolute inset-0">
        <BackgroundBeams />
      </div>
      
      {/* Subtle Matrix Rain Effect */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute text-[#00ff00] text-xs font-mono"
            style={{
              left: `${i * 3}%`,
              top: '-20px',
              animation: `fall ${Math.random() * 8 + 4}s linear infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          >
            {glitchText}
          </div>
        ))}
      </div>

      {/* Main content container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Enhanced Navigation Bar */}
        <div className="w-full px-6 py-4 bg-black/70 border-b border-[#00ff00]/30 backdrop-blur-md">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-[#00ff00] animate-pulse" />
              <span className="font-mono text-xl text-[#00ff00] tracking-wider">CYBERX CTF</span>
            </div>
            
            <div className="flex items-center space-x-6">
              {[
                { text: 'Leaderboard', icon: Trophy },
                { text: 'Rules', icon: ScrollText },
                { text: 'FAQ', icon: HelpCircle }
              ].map(({ text, icon: Icon }) => (
                <button
                  key={text}
                  className="group relative px-3 py-1 font-mono text-sm"
                >
                  <div className="relative flex items-center space-x-2">
                    <Icon className="w-4 h-4 text-[#00ff00] group-hover:animate-pulse" />
                    <span className="text-[#00cc00] group-hover:text-[#00bb00] transition-colors">
                      {text}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        
        <div className="text-center mt-8 mb-8">
          <h1 className="font-['Press_Start_2P'] text-5xl text-[#000000] tracking-[0.2em] mb-3">
            THE EYE
          </h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-4">
          {/* Logo with subtle animation */}
          <div className="mb-16 mt-[-2rem] relative">
            <img 
              src="/flag_logo.gif" 
              alt="Flag" 
              className="w-80 h-80 object-contain hover:animate-glitch"
            />
          </div>

          {/* Minimalist Action Buttons */}
          <div className="font-['Press_Start_2P'] flex space-x-12 w-full max-w-0.5xl justify-center">
            {[
              { text: 'REGISTER TEAM', icon: Users, primary: true },
              { text: 'JOIN TEAM', icon: Flag },
              
            ].map(({ text, icon: Icon, primary }) => (
              <button
                key={text}
                className={`group relative w-40 transform hover:-translate-y-1 
                           transition-all duration-200 ease-out ${
                             primary ? 'scale-105' : ''
                           }`}
              >
                <div className="relative flex items-center justify-center px-4 py-2 
                              border border-[#00ff00]/50 group-hover:border-[#00cc00] 
                              transition-all duration-200">
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-1 h-1 border-l border-t border-[#00ff00]/50 
                                group-hover:border-[#00cc00] transition-all" />
                  <div className="absolute top-0 right-0 w-1 h-1 border-r border-t border-[#00ff00]/50 
                                group-hover:border-[#00cc00] transition-all" />
                  <div className="absolute bottom-0 left-0 w-1 h-1 border-l border-b border-[#00ff00]/50 
                                group-hover:border-[#00cc00] transition-all" />
                  <div className="absolute bottom-0 right-0 w-1 h-1 border-r border-b border-[#00ff00]/50 
                                group-hover:border-[#00cc00] transition-all" />
                  
                  {/* Button Content */}
                  <div className="flex items-center space-x-2">
                    <Icon className={`w-4 h-4 ${
                      primary ? 'text-[#00cc00]' : 'text-[#00ff00]'
                    } group-hover:animate-pulse`} />
                    <span className={`font-mono text-sm ${
                      primary ? 'text-[#00cc00]' : 'text-[#00ff00]'
                    } group-hover:text-[#00cc00]`}>
                      {text}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          from { transform: translateY(-100%); }
          to { transform: translateY(100vh); }
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-1px, 1px); }
          40% { transform: translate(-2px, 2px); }
          60% { transform: translate(1px, -1px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite alternate;
        }
        @keyframes glow {
          from { text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00; }
          to { text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
