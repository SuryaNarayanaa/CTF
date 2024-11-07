// QuestionPage.js
import React, { useState, useEffect } from 'react';
import '../styles/QuestionPage.css';
import Header from '../components/Header';
import ScoreboardBanner from '../components/ScoreboardBanner';
import ChallengesBanner from '../components/ChallengesBanner';

const teamName = localStorage.getItem('teamName') || 'Team Name';

const QuestionPage = () => {
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [answerStatus, setAnswerStatus] = useState('');

    useEffect(() => {
        fetch('/Admin/questions/questionsByCategory')
            .then((res) => res.json())
            .then((data) => {
                setCategories(Object.keys(data));
            })
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

    useEffect(() => {
        if (selectedQuestion) {
            const savedStatus = JSON.parse(localStorage.getItem('answeredQuestions') || '{}');
            if (savedStatus[selectedQuestion._id] === true) {
                setAnswerStatus('correct');
                setUserAnswer('');
            }
        }
    }, [selectedQuestion]);

    const handleCategoryClick = (category) => {
        fetch(`/Admin/questions/questionsByCategory?category=${category}`)
            .then((res) => res.json())
            .then((data) => {
                setQuestions(data[category].questions);
                setSelectedQuestion(null);
                setAnswerStatus('');
            })
            .catch((error) => console.error('Error fetching questions:', error));
    };

    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
        setUserAnswer('');
        setAnswerStatus('');
    };

    const handleAnswerSubmit = () => {
        fetch('/ctf/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                teamName: teamName,
                title: selectedQuestion.title,
                answer: userAnswer,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.isCorrect) {
                    setAnswerStatus('correct');
                    const savedStatus = JSON.parse(localStorage.getItem('answeredQuestions') || '{}');
                    savedStatus[selectedQuestion._id] = true;
                    localStorage.setItem('answeredQuestions', JSON.stringify(savedStatus));
                } else {
                    setAnswerStatus('incorrect');
                }
            })
            .catch((error) => console.error('Error submitting answer:', error));
    };

    return (
        <div className="question-page">
            <div className="top-space">
                <Header />
            </div>

            <div className="main-content">
                <div className="left-space">
                    <ChallengesBanner />
                </div>

                <div className="question-table">
                    <div className="question-tabs">
                        <div className="tab-1">                            
                            {categories.map((category, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleCategoryClick(category)}
                                    className="category-button"
                                >
                                    {category}
                                </button>
                            ))}
                            <button class="category-button">sfdghnvmadsfzgxhc</button>
                            <button class="category-button">sgrdhfgdh</button>
                            


                        </div>

                        <div className="tab-2">
                            
                            {questions.map((question, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleQuestionClick(question)}
                                    className="question-button"
                                >
                                    {question.title}
                                </button>
                            ))}
                        </div>

                        <div className="tab-3">
                            <h2>Question Details</h2>
                            {selectedQuestion ? (
                                <>
                                    <div className="question-detail">
                                        <h3>{selectedQuestion.title}</h3>
                                        <p>{selectedQuestion.description}</p>
                                        {selectedQuestion.links && (
                                            <div className="links">
                                                <strong>Links:</strong>
                                                <ul>
                                                    {selectedQuestion.links.map((link, index) => (
                                                        <li key={index}><a href={link}>{link}</a></li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        value={userAnswer}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                        className={`answer-input ${answerStatus === 'correct' ? 'input-correct' : ''}`}
                                        placeholder="Enter your answer"
                                        disabled={answerStatus === 'correct'}
                                    />
                                    <button onClick={handleAnswerSubmit} className="submit-button" disabled={answerStatus === 'correct'}>
                                        Submit
                                    </button>
                                    {answerStatus === 'correct' && <p className="status-correct">Correct!</p>}
                                    {answerStatus === 'incorrect' && <p className="status-incorrect">Try Again.</p>}
                                </>
                            ) : (
                                <p>Select a question to see details</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="right-space">
                    <ScoreboardBanner />
                </div>
            </div>
        </div>
    );
};

export default QuestionPage;
