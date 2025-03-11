import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { getLeaderboard } from '../api/leaderboard';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
          try {
            const data = await getLeaderboard();
            setLeaderboard(data);
            console.log("Initial leaderboard:", data);
          } catch (error) {
            console.error('Error fetching leaderboard:', error);
          }
        };
    
        fetchLeaderboard();
    
        const socket = io("wss://your-backend-url.onrender.com", { transports: ['websocket'] });
    
        socket.on('leaderboardUpdated', (updatedLeaderboard) => {
          console.log("Leaderboard update received:", updatedLeaderboard);
          setLeaderboard(updatedLeaderboard);
        });
    
        return () => {
          socket.disconnect();
        };
      }, []);

    return (
        <div>
            <h2 className="retro-heading">Leaderboard</h2>
            <div className="scrollable-container">
                <table className="leaderboard">
                    <thead>
                        <tr>
                            <th className="retro-header">Place</th>
                            <th className="retro-header">Team</th>
                            <th className="retro-header">Flags Captured</th>
                            <th className="retro-header">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((entry) => (
                            <tr key={entry.userId}>
                                <td className="retro-cell">{entry.rank}</td>
                                <td className="retro-cell">{entry.team_name}</td>
                                <td className="retro-cell">{entry.flag}</td>
                                <td className="retro-cell">{entry.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
