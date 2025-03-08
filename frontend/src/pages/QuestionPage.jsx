/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useState,useEffect,useCallback } from 'react';
import '../styles/QuestionPage.css';
import Header from '../components/common/Header';
import ScoreboardBanner from '../components/common/ScoreboardBanner';
import ChallengesBanner from '../components/common/ChallengesBanner';
import QuestionList from '../components/questions/QuestionList';
import { useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query';
import {
  setCategories,
  setAnsweredQuestions,
  setIsLoading,
  setQuestions,
  setSelectedCategory,
  setSelectedQuestion,
  setUserAnswer,
  setAnswerStatus,
  setCategoryLoading,
  markQuestionAnswered,
  resetAnswerState,
} from '../redux/slices/questionSlice';


const fetchInitialData = async () => {
  const response = await fetch('/back/user/categories', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  });
  const result = await response.json();
  if (result.success) {
    const cats = result.data.categories
      ? (Array.isArray(result.data.categories)
          ? result.data.categories
          : Object.values(result.data.categories))
      : [];
    return { categories: cats, solved: result.data.solved || {} };
  } else {
    throw new Error(result.message);
  }
};


const fetchCategoryQuestions = async (categoryId) => {
  const response = await fetch(`/back/user/category-question/${categoryId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  });
  const result = await response.json();
  if (result.success) {
    return result.data;
  } else {
    throw new Error(result.message);
  }
};

const submitAnswer = async ({ questionId, answer }) => {
  const response = await fetch('/back/user/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      question_id: questionId,
      answer: answer,
    }),
  });
  const result = await response.json();
  return result;
};


export const loader = (queryClient) => async() =>{
  return await queryClient.ensureQueryData({queryKey:['initialData'],queryFn:fetchInitialData});
}




const QuestionPage = () => {
  const userData = useOutletContext();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {
    categories,
    questions,
    selectedCategory,
    selectedQuestion,
    answeredQuestions,
    userAnswer,
    answerStatus,
    isLoading,
    categoryLoading,  
  } = useSelector((state) => state.question);
  const [isSubmitLoading,setIsSubmitLoading] = useState(false);

  const { data: initialData, isLoading: queryLoading } = useQuery({
    queryKey:['initialData'],
    queryFn:fetchInitialData,
    staleTime: 300000,
  });

  useEffect(() => {
    if (initialData) {
      dispatch(setCategories(initialData.categories));
      dispatch(setAnsweredQuestions(initialData.solved));
      dispatch(setIsLoading(false));
    }
  }, [initialData, dispatch]);

  const { mutateAsync: submitAnswerMutation ,isLoading:isSubmitting} = useMutation({
    mutationFn:async({ questionId, answer }) => submitAnswer({ questionId, answer }),
      onSuccess: (result, variables) => {
        if (result.data && result.data.isCorrect === true) {
          dispatch(setAnswerStatus('correct'));
          dispatch(markQuestionAnswered(selectedQuestion._id));
        } else {
          dispatch(setAnswerStatus('incorrect'));
        }
        queryClient.invalidateQueries(['initialData']);
      },
      onError: (error) => {
        console.error('Error submitting answer:', error);
        dispatch(setAnswerStatus('error'));
      }
  });
  


  const handleCategoryClick = useCallback(async (category) => {
    dispatch(setCategoryLoading(true));
    dispatch(setSelectedCategory(category));
    dispatch(setQuestions([]));
    dispatch(setSelectedQuestion(null));
    try {
      const data = await fetchCategoryQuestions(category._id);
      dispatch(setQuestions(data));
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      dispatch(setCategoryLoading(false));
    }
  },[dispatch]);

  const handleQuestionClick = useCallback((question) => {
    dispatch(setSelectedQuestion(question));
    dispatch(resetAnswerState());
    if (Object.prototype.hasOwnProperty.call(answeredQuestions, question._id)) {
      dispatch(setAnswerStatus('correct'));
    } else {
      dispatch(setAnswerStatus(''));
    }
  },[answeredQuestions, dispatch]);

  const handleAnswerSubmit = useCallback(async () => {
    if (!selectedQuestion) return;
    setIsSubmitLoading(true);
    await submitAnswerMutation({ questionId: selectedQuestion._id, answer: userAnswer });
    setIsSubmitLoading(false);
  }, [selectedQuestion, userAnswer, submitAnswerMutation]);
  

  return (
    <div className="question-page">
      <div className="top-space">
        <Header team_name={userData?.team_name} flags={userData?.flag}/>
      </div>

      <div className="main-content">
        <div className="left-space">
          <ChallengesBanner />
        </div>

        <div className="question-table">
          <div className="question-tabs">
            <div className="tab-1">
              {(categories || []).map((category) => (
                <button
                  key={category._id}
                  onClick={() => handleCategoryClick(category)}
                  className={`category-button ${
                    selectedCategory && selectedCategory._id === category._id ? 'active' : ''
                  }`}
                >
                  {category.category_name}
                </button>
              ))}
            </div>

            <div className="tab-2">
              <QuestionList
                questions={questions}
                answeredQuestions={answeredQuestions}
                selectedQuestion={selectedQuestion}
                handleQuestionClick={handleQuestionClick}
              />
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
                          style={{ width: '80px', height: '70px', alignItems: 'center', justifyContent: 'center' }}
                        />
                      </div>
                    ) : (
                      <>
                        <input
                          type="text"
                          value={userAnswer}
                          onChange={(e) => dispatch(setUserAnswer(e.target.value))}
                          className={`answer-input ${answerStatus}`}
                          placeholder="Enter your answer"
                        />
                        <button onClick={handleAnswerSubmit} className="submit-button" disabled={isSubmitLoading}>
                          {isSubmitLoading  ? "Submitting..." : "Submit"}
                        </button>
                      </>
                    )}
                    {answerStatus === 'correct' && (
                      <p className="status-correct">Correct! Well done!</p>
                    )}
                    {answerStatus === 'incorrect' && (
                      <p className="status-incorrect">Try Your Best!</p>
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
};

export default QuestionPage;
