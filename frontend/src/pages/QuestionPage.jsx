import React, { useState, useEffect } from 'react';
import '../styles/QuestionPage.css';
import Header from '../components/Header';
import ScoreboardBanner from '../components/ScoreboardBanner';
import ChallengesBanner from '../components/ChallengesBanner';


const QuestionPage = () => {
    const [userData, setUserData] = useState({team_name: '',flag: 0,score: 0});
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [answerStatus, setAnswerStatus] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [answeredQuestions, setAnsweredQuestions] = useState({});
    const [categoryLoading,setCategoryLoading] = useState(false);



    const loadInitialData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/back/user/categories', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const result = await response.json();
            if (result.success) {
                const cats = result.data.categories
        ? (Array.isArray(result.data.categories)
            ? result.data.categories
            : Object.values(result.data.categories))
        : [];
            setCategories(cats);
                setAnsweredQuestions(result.data.solved||{});
            } else {
                console.error('Error loading initial data:', result.message);
            }
        } catch (error) {
            console.error('Error loading initial data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadInitialData();
    }, []);
    
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch('/back/user/getCurrentUser', {
              credentials: 'include'
            });
            const result = await response.json();
            
            if (result.success) {
              console.log("Fetched user data:", result.data);
              setUserData(result.data);
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
        
        fetchUserData();
      }, []);

    const handleCategoryClick = async (category) => {
        console.log(categories);
        try {
            setCategoryLoading(true);
            setSelectedCategory(category);
            setQuestions([]);
            setSelectedQuestion(null);

            const response = await fetch(`/back/user/category-question/${category._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const result = await response.json();
            if (result.success) {
                setQuestions(result.data);
            } else {
                console.error('Error fetching questions:', result.message);
            }
        } catch (error) {
            console.error('Error handling category click:', error);
        } finally {
            setCategoryLoading(false);
        }
    };


    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
        setUserAnswer('');
        setAnswerStatus(answeredQuestions.hasOwnProperty(question._id) ? 'correct' : '');
    };

    const handleAnswerSubmit = async () => {
        if (!selectedQuestion) return;

        try {
            const response = await fetch('/back/user/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    question_id: selectedQuestion._id,
                    answer: userAnswer
                })
            });
            const result = await response.json();
            if (result.data.isCorrect===true) {
                setAnswerStatus('correct');
                setAnsweredQuestions(prev => ({
                    ...prev,
                    [selectedQuestion._id]: true
                }));
            } else {
                setAnswerStatus('incorrect');
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
            <Header team_name={userData?.team_name} flags={userData?.flag} points={userData?.score} userId={userData?._id} />
            </div>    
            <div className="main-content">
                <div className="left-space">
                    <ChallengesBanner />
                </div>
    
                <div className="question-table">
                    <div className="question-tabs">
                        <div className="tab-1">
                            {(categories|| []).map((category) => (
                                
                                <button
                                    key={category._id}
                                    onClick={() => handleCategoryClick(category)}
                                    className={`category-button ${selectedCategory && selectedCategory._id === category._id? 'active' : ''}`}
                                >
                                    {category.category_name}
                                </button>
                            ))}
                        </div>
       
    
                        <div className="tab-2">
                        <div className="questions-list">
                            {(questions|| []).map((question) => (
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