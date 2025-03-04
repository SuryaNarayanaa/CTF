import React from 'react';
import Leaderboard from '../components/Leaderboard';
import '../styles/LeaderboardPage.css'; // Import the CSS file for styling
import Header from '../components/Header';
import ScoreboardBanner from '../components/ScoreboardBanner';
import ChallengesBanner from '../components/ChallengesBanner';
import { useOutletContext } from 'react-router-dom';

const LeaderboardPage = () => {
  const user = useOutletContext();

  return (
    <div className="leaderboard-page">

      <div className='top-space'>
        <Header team_name = {user?.team_name}/>
      </div>

      <div className="main-content">
        {/* Left vertical space with an image */}
        <div className="left-space">
          <ScoreboardBanner />
        </div>

        {/* Leaderboard table */}
        <div className="leaderboard-table">
          <Leaderboard />
        </div>

        {/* Right vertical space (for additional content or margin) */}
        <div className="right-space">
          <div className='top-part'></div>
          <div className='bottom-part'>
            <ChallengesBanner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;