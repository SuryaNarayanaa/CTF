import React, { useEffect } from 'react';
import { BackgroundBeams } from '../components/ui/background-beams';
import { Boxes } from '../components/ui/background-boxes';  // Ensure the correct import path if different
import { 
  Shield, 
  Trophy, 
  ScrollText, 
  HelpCircle,
  Users,
  Flag
} from 'lucide-react';

const HomePage = () => 
{
  // Background Beams Image
  useEffect(() => {
    document.body.style.backgroundImage = "url('bg.png')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';

    

    return () => {
      document.body.style.backgroundImage = '';
    };
  }, []);


  return (
    <div className="flex items-center justify-center min-h-screen relative">
     
      <div className="relative z-0">
        <Boxes />
      </div>

    </div>
  );
};


export default HomePage;
