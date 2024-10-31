// /d:/The EYE/CTF/frontend/vite-project/src/pages/questionPage.jsx
import React from 'react';
import Question from '../components/Question';
import '../styles/QuestionPage.css'; // Import the CSS file for styling
import Header from '../components/Header';
const QuestionPage = () => {
    return (
        <div className="question-page">
            {/* Div for additional vertical spacing at the top */}
            <div className='top-space'>
                <Header />
            </div>

            <div className="main-content">
                {/* Left vertical space with an image */}
                <div className="left-space">
                    <img src="/challenges.png" alt="Challenges" />
                </div>

                {/* question table */}
                <div className="question-table">
                
                <div className="question-tabs">
                    <div className="tab-1">
                        <h2>Categories</h2>
                        {/* Add your categories here */}
                    </div>
                    <div className="tab-2">
                        <h2>Questions</h2>
                        {/* Add your list of question titles here */}
                    </div>
                    <div className="tab-3">
                        <h2>Question Details</h2>
                        <Question />
                    </div>
                </div>
                </div>

                {/* Right vertical space (for additional content or margin) */}
                <div className="right-space">
                    <div className='top-part'>

                    </div>
                       <div className='bottom-part'>
                        <img src="/scoreboard.png" alt="Scoreboard" />
                        </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionPage;
