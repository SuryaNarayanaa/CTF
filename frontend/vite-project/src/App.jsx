import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LeaderboardPage from './pages/LeaderboardPage';
import QuestionPage from './pages/QuestionPage';
import './index.css';

const teamName = localStorage.getItem('teamName') || null;
const store = ["23n237", "23n256", "21z202", "22n228", "22n266"];

const App = () => {
  const isTeamInStore = store.includes(teamName);

  return (
    <Routes>
      {/* If teamName doesn't exist, redirect all routes to HomePage */}
      {!teamName ? (
        <>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/" element={<HomePage />} />
        </>
      ) : (
        // If teamName exists, render all routes with conditions
        <>
          <Route path="/" element={<HomePage />} />
          {/* Conditionally render AdminPage if teamName is in store, else redirect */}
          <Route
            path="/admin/*"
            element={isTeamInStore ? <AdminPage /> : <Navigate to="/" replace />}
          />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/challenges" element={<QuestionPage />} />
        </>
      )}
    </Routes>
  );
};

export default App;
