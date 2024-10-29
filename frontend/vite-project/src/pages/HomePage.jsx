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
  const [glitchActive, setGlitchActive] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const chars = '10';
    const interval = setInterval(() => {
      const randomChar = chars[Math.floor(Math.random() * chars.length)];
      setGlitchText(randomChar);
    }, 100);
    
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 3000);
    
    const handleMouseMove = (e) => {
      const rect = document.getElementById('eye-title').getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 20;
      const y = (e.clientY - rect.top - rect.height / 2) / 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearInterval(interval);
      clearInterval(glitchInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-black text-[#00ff00]">
      <div className="absolute inset-0 bg-[#000000] bg-opacity-90">
        <BackgroundBeams />
      </div>
      
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute text-[#00ff00] text-xs font-mono"
            style={{
              left: `${i * 2}%`,
              top: '-20px',
              animation: `fall ${Math.random() * 10 + 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            {glitchText}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-[url('/static-noise.gif')] opacity-5 pointer-events-none" />

      <div className="relative z-10 min-h-screen flex flex-col">
        <nav className="w-full px-4 md:px-6 py-3 md:py-4 bg-black/90 border-b border-[#00ff00]/30 backdrop-blur-lg">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 md:space-x-3 group">
              <Shield className="w-5 h-5 md:w-7 md:h-7 text-[#00ff00] group-hover:animate-ping" />
              <span className="font-['Press_Start_2P'] text-sm md:text-xl text-[#00ff00] tracking-wider group-hover:animate-pulse">
                CYBERX CTF
              </span>
            </div>
            
            <div className="flex items-center space-x-4 md:space-x-8">
              {[
                { text: 'Leaderboard', icon: Trophy },
                { text: 'Rules', icon: ScrollText },
                { text: 'FAQ', icon: HelpCircle }
              ].map(({ text, icon: Icon }) => (
                <button
                  key={text}
                  className="group relative px-2 md:px-4 py-1 md:py-2 font-mono text-xs md:text-sm hover:bg-[#00ff00]/5 rounded transition-all duration-300"
                >
                  <div className="relative flex items-center space-x-1 md:space-x-2">
                    <Icon className="w-3 h-3 md:w-4 md:h-4 text-[#00ff00] group-hover:animate-pulse" />
                    <span className="hidden md:inline text-[#00ff00] group-hover:text-[#00ff00]">
                      {text}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6 md:mb-8">
            <img 
              src="/flag_logo.gif" 
              alt="CTF Logo" 
              className={`w-full h-full object-contain ${glitchActive ? 'animate-glitch-img' : ''}`}
            />
            
          </div>

          <div className="text-center mb-12 md:mb-16">
            <h1 
              id="eye-title"
              className="font-['Press_Start_2P'] text-3xl md:text-5xl text-[#00ff00] tracking-wider mb-4 md:mb-6 relative"
              style={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              THE EYE
            </h1>
            <p className="font-mono text-lg md:text-xl text-[#00cc00] glitch-text">
              BREACH • EXPLOIT • CAPTURE
            </p>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            {[
              { text: 'REGISTER TEAM', icon: Users, primary: true },
              { text: 'JOIN TEAM', icon: Flag }
            ].map(({ text, icon: Icon, primary }) => (
              <button
                key={text}
                className={`group relative transform hover:-translate-y-1 transition-all duration-300 
                           ${primary ? 'scale-105' : ''}`}
              >
                <div className="absolute inset-0 bg-[#00ff00]/10 opacity-0 group-hover:opacity-100 
                              transition-opacity duration-300 animate-glitch-bg" />
                
                <div className="relative flex items-center justify-center px-6 md:px-8 py-3 md:py-4 
                              border-2 border-[#00ff00]/50 group-hover:border-[#00ff00]
                              bg-black/50 group-hover:bg-black/70
                              transition-all duration-300">
                  <div className="absolute top-0 left-0 w-2 h-2 md:w-3 md:h-3 border-l-2 border-t-2 border-[#00ff00] 
                                group-hover:w-3 group-hover:h-3 md:group-hover:w-4 md:group-hover:h-4 transition-all duration-300" />
                  <div className="absolute top-0 right-0 w-2 h-2 md:w-3 md:h-3 border-r-2 border-t-2 border-[#00ff00] 
                                group-hover:w-3 group-hover:h-3 md:group-hover:w-4 md:group-hover:h-4 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 md:w-3 md:h-3 border-l-2 border-b-2 border-[#00ff00] 
                                group-hover:w-3 group-hover:h-3 md:group-hover:w-4 md:group-hover:h-4 transition-all duration-300" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 md:w-3 md:h-3 border-r-2 border-b-2 border-[#00ff00] 
                                group-hover:w-3 group-hover:h-3 md:group-hover:w-4 md:group-hover:h-4 transition-all duration-300" />
                  
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#00ff00] group-hover:animate-pulse" />
                    <span className="font-mono text-xs md:text-sm text-[#00ff00] tracking-wider">
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
        
        @keyframes glitch-text {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); clip-path: inset(0 0 50% 0); }
          40% { transform: translate(2px, -2px); clip-path: inset(50% 0 0 0); }
          60% { transform: translate(-2px); clip-path: inset(25% 0 25% 0); }
          80% { transform: translate(2px); clip-path: inset(10% 0 40% 0); }
          100% { transform: translate(0); }
        }
        
        @keyframes glitch-img {
          0% { transform: translate(0); }
          20% { transform: translate(-5px, 5px); }
          40% { transform: translate(5px, -5px); }
          60% { transform: translate(-5px); }
          80% { transform: translate(5px); }
          100% { transform: translate(0); }
        }
        
        @keyframes glitch-bg {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -2px); }
          60% { transform: translate(-2px); }
          80% { transform: translate(2px); }
          100% { transform: translate(0); }
        }
        
        .animate-glitch-text {
          animation: glitch-text 0.3s linear infinite;
        }
        
        .animate-glitch-img {
          animation: glitch-img 0.3s linear infinite;
        }
        
        .animate-glitch-bg {
          animation: glitch-bg 0.3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;