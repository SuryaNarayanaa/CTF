import React, { useState, useEffect, useRef } from 'react';

// A broader set of characters for the scramble effect
const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+[]{}|;:,.<>?/';

// Helper to get a random character from the set
const randomChar = () => CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];

function ScrambleText({ text, duration = 50, interval = 20 }) {
  const [displayText, setDisplayText] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    let step = 0;
    const totalSteps = Math.floor(duration / interval);

    const scramble = () => {
      step++;
      if (step < totalSteps) {
        // Replace the entire text with random characters each step
        const scrambled = text
          .split('')
          .map(() => randomChar())
          .join('');
        setDisplayText(scrambled);
        timeoutRef.current = setTimeout(scramble, interval);
      } else {
        // Final step: show the correct text
        setDisplayText(text);
      }
    };

    scramble();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, duration, interval]);

  return <span className='animated'>{displayText}</span>;
}

export default ScrambleText;
