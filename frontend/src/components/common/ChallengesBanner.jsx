
import React from 'react';

const ChallengesBanner = () => {
    return (
        <a href="/challenges" className="challenges-link">
            <img
                src="/challenges.png"
                alt="Challenges"
                onMouseOver={(e) => (e.currentTarget.src = '/challenges-hover.png')}
                onMouseOut={(e) => (e.currentTarget.src = '/challenges.png')}
            />
        </a>
    );
};

export default React.memo(ChallengesBanner);