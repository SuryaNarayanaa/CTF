import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '../api/leaderboard';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const data = await getLeaderboard();
                setLeaderboard(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching leaderboard:', error);
            }
        };
        fetchLeaderboard();
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
                        {leaderboard.map((entry, index) => (
                            <tr key={entry.team_name}>
                                <td className="retro-cell">{index + 1}</td>
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
