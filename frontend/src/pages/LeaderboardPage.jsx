import React from 'react';
import Leaderboard from '../components/Leaderboard';
import '../styles/LeaderboardPage.css'; // Import the CSS file for styling
import Header from '../components/Header';
import ScoreboardBanner from '../components/ScoreboardBanner';
import ChallengesBanner from '../components/ChallengesBanner';
import { useState,useEffect } from 'react';





const LeaderboardPage = () => {
      const [userData, setUserData] = useState({team_name: '',flag: 0,score: 0});
      

      useEffect(() => {
          const fetchUserData = async () => {
            try {
              const response = await fetch('/back/user/getCurrentUser', {
                credentials: 'include'
              });
              const result = await response.json();
              
              if (result.success) {
                console.log("Fetched user data:", result.data);
                setUserData(result.data);
              }
            } catch (error) {
              console.error("Error fetching user data:", error);
            }
          };
          
          fetchUserData();
        }, []);

  return (
    <div className="leaderboard-page">

      <div className='top-space'>
        <Header team_name = {userData?.team_name} flags={userData?.flag} userId={userData?._id}/>
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