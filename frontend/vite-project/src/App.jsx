import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LeaderboardPage from './pages/LeaderboardPage';
import QuestionPage from './pages/QuestionPage';
import './index.css';


const App = () => {
  return (
    <Routes>
      {/* If teamName doesn't exist, redirect all routes to HomePage */}
     
          <Route path="/" element={<HomePage />} />     
          {/* Conditionally render AdminPage if teamName is in store, else redirect */}
          <Route
            path="/admin/*" element={<AdminPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/challenges" element={<QuestionPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />

      
      
    </Routes>
  );
};

export default App;
