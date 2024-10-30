import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '../api/leaderboard';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const response = await getLeaderboard();
            setLeaderboard(response);
        };
        fetchLeaderboard();
    }, []);

    return (
        <div>
            <h2>Leaderboard</h2>
            <ul>
                {leaderboard.map((entry) => (
                    <li key={entry.team}>
                        {entry.team}: {entry.score}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;