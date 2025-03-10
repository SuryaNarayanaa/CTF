
import React from 'react';

const ScoreboardBanner = () => {
    return (
        <div>
            <div className="top-part">
                <a href="/leaderboard" className="challenges-link">
                    <img
                        src="/scoreboard.png"
                        alt="scoreboard"
                        onMouseOver={(e) => (e.currentTarget.src = '/scoreboard-hover.png')}
                        onMouseOut={(e) => (e.currentTarget.src = '/scoreboard.png')}
                    />
                </a>
            </div>
        </div>
    );
};

export default React.memo(ScoreboardBanner);