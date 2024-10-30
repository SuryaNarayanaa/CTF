// /d:/The EYE/CTF/frontend/vite-project/src/pages/LeaderboardPage.jsx
import React from 'react';
import Leaderboard from '../components/Leaderboard';
import '../styles/LeaderboardPage.css'; // Import the CSS file for styling

const LeaderboardPage = () => {
    return (
        <div className="leaderboard-page">
            {/* Div for additional vertical spacing at the top */}
            <div className='top-space'></div>

            <div className="main-content">
                {/* Left vertical space with an image */}
                <div className="left-space">
                    <img src="/scoreboard.png" alt="Scoreboard" />
                </div>

                {/* Leaderboard table */}
                <div className="leaderboard-table">
                    <Leaderboard />
                </div>

                {/* Right vertical space (for additional content or margin) */}
                <div className="right-space"></div>
            </div>
        </div>
    );
};

export default LeaderboardPage;
