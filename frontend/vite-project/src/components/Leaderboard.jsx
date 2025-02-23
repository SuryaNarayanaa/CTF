import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '../api/leaderboard';
import '../styles/Leaderboard.css'; // Import the same CSS file

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try{
                const response = await getLeaderboard();
            setLeaderboard(response);
        }catch(error){
            console.error('Error fetching leaderboard:', error);
        };
        fetchLeaderboard();
    };
}, []);

    return (
        <div>
            <h2 className="retro-heading">Leaderboard</h2>
            <div className="scrollable-container"> {/* Add the scrollable container here */}
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
                                <td className="retro-cell">{entry.flags}</td>
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
