import {Link} from 'react-router-dom'
import React from 'react';

const ChallengesBanner = () => {
    return (
        <Link to="/challenges" className="challenges-link">
            <img
                src="/challenges.png"
                alt="Challenges"
                onMouseOver={(e) => (e.currentTarget.src = '/challenges-hover.png')}
                onMouseOut={(e) => (e.currentTarget.src = '/challenges.png')}
            />
        </Link>
    );
};

export default React.memo(ChallengesBanner);