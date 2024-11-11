import React, { useState, useEffect } from 'react';
import '../styles/QuestionPage.css';
import Header from '../components/Header';
import ScoreboardBanner from '../components/ScoreboardBanner';
import ChallengesBanner from '../components/ChallengesBanner';
import axios from 'axios';
import { fetchTeams } from '../api/teams';

const QuestionPage = () => {
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [answerStatus, setAnswerStatus] = useState('');
    const [categoryFunThings, setCategoryFunThings] = useState({});
    const [teamNameInput, setTeamNameInput] = useState('');
    const [inputError, setInputError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isCategoryUnlocked, setIsCategoryUnlocked] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const currentTeamName = localStorage.getItem('teamName') || 'Team Name';
    const VITE_API_URL = import.meta.env.VITE_API_URL;

    const loadInitialData = async () => {
        try {
            setIsLoading(true);
            const categoriesResponse = await axios.get(`${VITE_API_URL}/Admin/questions/questionsByCategory`);
            const fetchedCategories = Object.keys(categoriesResponse.data);
            setCategories(fetchedCategories);
             
            const teamsData = await fetchTeams();
            console.log('Fetched teams:', teamsData);
            const otherTeams = teamsData.filter(team => team.name !== currentTeamName);
            console.log('Other teams:', otherTeams);

            const funThings = {};
            const usedTeams = new Set();

            fetchedCategories.forEach(category => {
                const availableTeams = otherTeams.filter(team => !usedTeams.has(team.name));
                if (availableTeams.length > 0) {
                    const randomIndex = Math.floor(Math.random() * availableTeams.length);
                    const randomTeam = availableTeams[randomIndex];
                    funThings[category] = {
                        funThing: randomTeam.funFact,
                        teamName: randomTeam.name
                    };
                    usedTeams.add(randomTeam.name);
                }
            });

            console.log('Final fun things mapping:', funThings);
            setCategoryFunThings(funThings);
            setIsLoading(false);
        } catch (error) {
            console.error('Error loading initial data:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadInitialData();
        const savedUnlocked = localStorage.getItem('unlockedCategories');
        if (savedUnlocked) {
            setIsCategoryUnlocked(JSON.parse(savedUnlocked));
        }
    }, [currentTeamName]);

    const handleCategoryClick = async (category) => {
        setSelectedCategory(category);
        setTeamNameInput('');
        setInputError('');
        setQuestions([]);
        setSelectedQuestion(null);

        if (isCategoryUnlocked[category]) {
            try {
                const response = await axios.get(
                    `${VITE_API_URL}/Admin/questions/questionsByCategory?category=${category}`
                );
                if (response.data[category] && response.data[category].questions) {
                    setQuestions(response.data[category].questions);
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        }
    };

    const handleTeamNameSubmit = async () => {
        if (!selectedCategory) return;

        const correctTeamName = categoryFunThings[selectedCategory]?.teamName;
        
        if (teamNameInput.toLowerCase() === correctTeamName?.toLowerCase()) {
            const newUnlockedState = { 
                ...isCategoryUnlocked, 

                [selectedCategory]: true

            };
            setIsCategoryUnlocked(newUnlockedState);
            localStorage.setItem('unlockedCategories', JSON.stringify(newUnlockedState));
            setInputError('');

            try {
                const response = await axios.post(`${VITE_API_URL}/team/update`, {
                    teamname: currentTeamName,
                    flag:true
                });
            } catch (error) {
                console.error('Error updating ', error);
            }


            });
            
            try {
                const response = await axios.get(
                    `${VITE_API_URL}/Admin/questions/questionsByCategory?category=${selectedCategory}`
                );
                if (response.data[selectedCategory] && response.data[selectedCategory].questions) {
                    setQuestions(response.data[selectedCategory].questions);
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        } else {
            setInputError('Incorrect team name. Please try again.');
        }
    };

    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
        setUserAnswer('');
        setAnswerStatus('');
    };

    const handleAnswerSubmit = async () => {
        if (!selectedQuestion) return;

        try {
            const response = await axios.post(`${VITE_API_URL}/ctf/submit`, {
                teamName: currentTeamName,
                title: selectedQuestion.title,
                answer: userAnswer,
            });

            if (response.data.isCorrect) {
                setAnswerStatus('correct');
                const savedStatus = JSON.parse(localStorage.getItem('answeredQuestions') || '{}');
                savedStatus[selectedQuestion._id] = true;
                localStorage.setItem('answeredQuestions', JSON.stringify(savedStatus));
            } else {
                setAnswerStatus('incorrect');
            }
        } catch (error) {
            console.error('Error submitting answer:', error);
            setAnswerStatus('error');
        }
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
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryClick(category)}
                                    className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {selectedCategory && !isCategoryUnlocked[selectedCategory] ? (
                            <div className="category-overlay">
                                <div className="fun-thing-verification">
                                    <div className="lock-icon">🔒</div>
                                    <h3>Category Locked</h3>
                                    <p>To unlock this category, guess which team provided this fun fact:</p>
                                    <p className="fun-thing">"{categoryFunThings[selectedCategory]?.funThing || ''}"</p>
                                    <input
                                        type="text"
                                        value={teamNameInput}
                                        onChange={(e) => setTeamNameInput(e.target.value)}
                                        placeholder="Enter team name"
                                        className={inputError ? 'error' : ''}
                                    />
                                    {inputError && <p className="error-message">{inputError}</p>}
                                    <button 
                                        onClick={handleTeamNameSubmit}
                                        className="submit-button"
                                    >
                                        Submit
                                    </button>
                                    {process.env.NODE_ENV === 'development' && (
                                        <p className="debug-info">Debug - Team name: {categoryFunThings[selectedCategory]?.teamName}</p>
                                    )}
                                </div>
                            </div>
                        ) : null}
    
                        <div className="tab-2">
                            <div className="questions-list">
                                {questions.map((question) => {
                                    const isAnswered = JSON.parse(
                                        localStorage.getItem('answeredQuestions') || '{}'
                                    )[question._id];
                                    return (
                                        <button
                                            key={question._id}
                                            onClick={() => handleQuestionClick(question)}
                                            className={`question-button ${isAnswered ? 'answered' : ''} 
                                                ${selectedQuestion?._id === question._id ? 'selected' : ''}`}
                                        >
                                            {question.title}
                                            {question.points && (
                                                <span className="points">[{question.points} points]</span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
    

<div className="tab-3">
    {selectedQuestion ? (
        <div className="question-detail">
            <div className="question-header">
                <span className="points">
                    {selectedQuestion.points && `[${selectedQuestion.points} points]`}
                </span>
                <h3>{selectedQuestion.title}</h3>
            </div>
            <div className="question-content">
                <p>{selectedQuestion.description}</p>
                {selectedQuestion.links && (
                    <div className="links">
                        <strong>Links:</strong>
                        <ul>
                            {selectedQuestion.links.map((link, index) => (
                                <li key={index}>
                                    <a href={link} target="_blank" rel="noopener noreferrer">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="answer-section">
                {/* Check if question is already answered */}
                {JSON.parse(localStorage.getItem('answeredQuestions') || '{}')[selectedQuestion._id] ? (
                    <div className="solved-state">
                        <input
                            type="text"
                            value={userAnswer}
                            className="answer-input solved"
                            disabled
                            placeholder="Question solved!"
                        />
                        
                        <button className="submit-button" disabled>
                            Submitted
                        </button>
                    </div>
                ) : (
                    <>
                        <input
                            type="text"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            className={`answer-input ${answerStatus}`}
                            placeholder="Enter your answer"
                        />
                        <button
                            onClick={handleAnswerSubmit}
                            className="submit-button"
                        >
                            Submit
                        </button>
                    </>
                )}
                {answerStatus === 'correct' && (
                    <p className="status-correct">Correct! Well done!</p>
                )}
                {answerStatus === 'incorrect' && (
                    <p className="status-incorrect">Incorrect. Try again!</p>
                )}
            </div>
        </div>
    
                            ) : (
                                <p className="select-prompt">Select a question to see details</p>
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
}

export default QuestionPage;