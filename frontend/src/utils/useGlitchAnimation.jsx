import { useEffect,useState } from "react";

const useGlitchAnimation = (Text,isPending) => {
    const [displayText, setDisplayText] = useState('');
  
    useEffect(() => {
      if (isPending) {
        let currentFrame = 0;
        const frames = [
          Math.random().toString(36).substring(2, 8),
          Math.random().toString(36).substring(2, 8),
          Text
        ];
  
        const interval = setInterval(() => {
          setDisplayText(frames[currentFrame]);
          currentFrame = (currentFrame + 1) % frames.length;
        }, 100);
  
        setTimeout(() => {
          clearInterval(interval);
          setDisplayText('Processing....');
        }, 1000);
  
        return () => clearInterval(interval);
      } else {
        setDisplayText(Text);
      }
    }, [isPending]);
  
    return displayText;
  };

  export default useGlitchAnimation