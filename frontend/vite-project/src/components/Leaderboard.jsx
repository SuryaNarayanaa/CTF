import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '../api/leaderboard';
import '../styles/Leaderboard.css'; // Import the same CSS file

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const response = await getLeaderboard();
            // Sort the leaderboard based on scores (flags captured)
            const sortedLeaderboard = response.sort((a, b) => b.score - a.score);
            setLeaderboard(sortedLeaderboard);
        };
        fetchLeaderboard();
    }, []);

    return (
        <div>
            <h2 className="retro-heading">Leaderboard</h2>
            <table className="leaderboard">
                <thead>
                    <tr>
                        <th className="retro-header">Place</th>
                        <th className="retro-header">Team</th>
                        <th className="retro-header">Flags Captured</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((entry, index) => (
                        <tr key={entry.team}>
                            <td className="retro-cell">{index + 1}</td>
                            <td className="retro-cell">{entry.team}</td>
                            <td className="retro-cell">{entry.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
