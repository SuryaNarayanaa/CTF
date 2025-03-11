import {Link} from 'react-router-dom'
import React from 'react';

const ScoreboardBanner = () => {
    return (
        <>
            <Link to="/leaderboard" className="challenges-link">
                <img
                    src="/scoreboard.png"
                    alt="scoreboard"
                    className='h-full'
                    onMouseOver={(e) => (e.currentTarget.src = '/scoreboard-hover.png')}
                    onMouseOut={(e) => (e.currentTarget.src = '/scoreboard.png')}
                />
            </Link>
        </>
    );
};

export default React.memo(ScoreboardBanner);