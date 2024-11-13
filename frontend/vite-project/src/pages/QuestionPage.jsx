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
    const [answeredQuestions, setAnsweredQuestions] = useState({});
    const [categoryLoading, setCategoryLoading] = useState(false);

    const currentTeamName = localStorage.getItem('teamName') || 'Team Name';
    const VITE_API_URL = import.meta.env.VITE_API_URL;

    const checkQuestionStatus = async (questionId) => {
        try {
            const response = await axios.post(`${VITE_API_URL}/ctf/correct`, {
                teamName: currentTeamName,
                questionId: questionId
            });
            return response.data.correct;
        } catch (error) {
            console.error('Error checking question status:', error);
            return false;
        }
    };

    const loadInitialData = async () => {
        try {
            setIsLoading(true);
            const categoriesResponse = await axios.get(`${VITE_API_URL}/Admin/questions/questionsByCategory`);
            const fetchedCategories = Object.keys(categoriesResponse.data);
            setCategories(fetchedCategories);
             
            const teamsData = await fetchTeams();
            const otherTeams = teamsData.filter(team => team.name !== currentTeamName);
            
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
            
            setCategoryFunThings(funThings);
        } catch (error) {
            console.error('Error loading initial data:', error);
        } finally {
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
        try {
            setCategoryLoading(true);
            setSelectedCategory(category);
            setTeamNameInput('');
            setInputError('');
            setQuestions([]);
            setSelectedQuestion(null);

            if (isCategoryUnlocked[category]) {
                const response = await axios.get(
                    `${VITE_API_URL}/Admin/questions/questionsByCategory?category=${category}`
                );
                
                if (response.data[category] && response.data[category].questions) {
                    const fetchedQuestions = response.data[category].questions;
                    setQuestions(fetchedQuestions);

                    try {
                        const statusChecks = await Promise.all(
                            fetchedQuestions.map(async (question) => {
                                const isAnswered = await checkQuestionStatus(question._id);
                                return [question._id, isAnswered];
                            })
                        );

                        const newAnsweredQuestions = Object.fromEntries(statusChecks);
                        setAnsweredQuestions(prev => ({
                            ...prev,
                            ...newAnsweredQuestions
                        }));
                    } catch (error) {
                        console.error('Error checking question statuses:', error);
                    }
                }
            }
        } catch (error) {
            console.error('Error handling category click:', error);
        } finally {
            setCategoryLoading(false);
        }
    };

    const handleTeamNameSubmit = async () => {
        if (!selectedCategory) return;

        const correctTeamName = categoryFunThings[selectedCategory]?.teamName;
        
        if (teamNameInput.toLowerCase() === correctTeamName?.toLowerCase()) {
            try {
                const newUnlockedState = { 
                    ...isCategoryUnlocked, 
                    [selectedCategory]: true 
                };
                setIsCategoryUnlocked(newUnlockedState);
                localStorage.setItem('unlockedCategories', JSON.stringify(newUnlockedState));
                setInputError('');

                await axios.post(`${VITE_API_URL}/team/update`, {
                    name: currentTeamName,
                    category: selectedCategory
                });

                // Fetch questions after unlocking
                await handleCategoryClick(selectedCategory);
            } catch (error) {
                console.error('Error unlocking category:', error);
                setInputError('An error occurred while unlocking the category.');
            }
        } else {
            setInputError('Incorrect team name. Please try again.');
        }
    };

    const handleQuestionClick = async (question) => {
        setSelectedQuestion(question);
        setUserAnswer('');
        setAnswerStatus('');
        
        try {
            const isAnswered = await checkQuestionStatus(question._id);
            setAnswerStatus(isAnswered ? 'correct' : '');
            setAnsweredQuestions(prev => ({
                ...prev,
                [question._id]: isAnswered
            }));
        } catch (error) {
            console.error('Error checking question status:', error);
        }
    };

    const handleAnswerSubmit = async () => {
        if (!selectedQuestion) return;

        try {
            const response = await axios.post(`${VITE_API_URL}/ctf/submit`, {
                teamName: currentTeamName,
                title: selectedQuestion.title,
                answer: userAnswer,
            });

            const isCorrect = response.data.isCorrect;
            setAnswerStatus(isCorrect ? 'correct' : 'incorrect');
            
            if (isCorrect) {
                setAnsweredQuestions(prev => ({
                    ...prev,
                    [selectedQuestion._id]: true
                }));
            }
        } catch (error) {
            console.error('Error submitting answer:', error);
            setAnswerStatus('error');
        }
    };

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

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
                {questions.map((question) => (
                    <button
                        key={question._id}
                        onClick={() => handleQuestionClick(question)}
                        className={`question-button 
                            ${answeredQuestions[question._id] ? 'answered' : ''} 
                            ${selectedQuestion?._id === question._id ? 'selected' : ''}`}
                    >
                        {question.title}
                        {question.points && (
                            <span className="points">[{question.points} points]</span>
                        )}
                    </button>
                ))}
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
    <div className="links">
        <strong>Links:</strong>
        {selectedQuestion.links && selectedQuestion.links.length > 0 ? (
            <ul>
                {selectedQuestion.links.map((link, index) => (
                    <li key={index}>
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            {link}
                        </a>
                    </li>
                ))}
            </ul>
        ) : (
            <span> - </span>
        )}
    </div>
</div>
<div className="answer-section">
    {answerStatus === 'correct' ? (
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
            <img 
                src="/FLAG_LOGO.gif" 
                alt="Correct Answer"
                className="status-image"
                style={{ width: '80px', height: '70px',alignItems:'center',justifyContent:'center' }}
            />
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
                    <p className="status-incorrect ">Try Your Best!</p>                    
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