import React, { useState, useEffect } from 'react';
import '../../styles/MouseTracker.css';

const MouseTracker = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [mode, setMode] = useState('ACTIVE');
    const [speed, setSpeed] = useState(0);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const handleMouseMove = (e) => {
            const distance = Math.sqrt(
                Math.pow(e.clientX - mousePosition.x, 2) +
                Math.pow(e.clientY - mousePosition.y, 2)
            );
            setSpeed((Math.round(distance * 10) / 1000).toFixed(2));
            setMousePosition({ x: e.clientX/10, y: e.clientY/10 });
        };

        const updateTime = () => setTime(new Date());

        window.addEventListener('mousemove', handleMouseMove);
        const timer = setInterval(updateTime, 1000);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(timer);
        };
    }, [mousePosition]);

    const toggleMode = () => setMode(mode === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE');

    return (
        <div className="mouse-tracker">
            <div className="display">
                <span className="display-text">
                    {mousePosition.x.toFixed(1)}
                    <span className="mode" onClick={toggleMode}>
                        {mode}
                    </span>
                </span>
                <span className="display-text">
                  {mousePosition.y.toFixed(2)}
                </span>
                <span className="speed">Speed: {speed}</span>
                <span className="time">
                    {time.toLocaleTimeString()} {time.toLocaleDateString()}
                </span>
            </div>
        </div>
    );
};

export default MouseTracker;
