// src/pages/QuestionPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchQuestions, fetchQuestionById, submitAnswer } from '../api/ctf';

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [submissionResult, setSubmissionResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load all questions when the component mounts
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        console.log('Fetching questions...');
        const data = await fetchQuestions();
        console.log('Fetched data:', data);
        setQuestions(data);
      } catch (err) {
        setError('Failed to load questions');
        console.error(err); // Log any error details
      } finally {
        setLoading(false);
      }
    };
  
    loadQuestions();
  }, []);

  // Fetch details for a specific question when clicked
  const handleQuestionClick = async (id) => {
    try {
      const question = await fetchQuestionById(id);
      setSelectedQuestion(question);
      setSubmissionResult(null); // Clear previous result when selecting a new question
    } catch (error) {
      console.error('Failed to load question details:', error);
    }
  };

  // Handle answer submission
  const handleAnswerSubmit = async () => {
    if (!selectedQuestion) return;

    try {
      const result = await submitAnswer(selectedQuestion._id, answer);
      setSubmissionResult(result);
      setAnswer(''); // Clear the input after submission
    } catch (error) {
      console.error('Failed to submit answer:', error);
    }
  };

  return (
    <div className="flex p-6 space-x-6 bg-gray-900 text-white h-screen">
      {/* Error handling */}
      {error && <div className="text-red-500">{error}</div>}
      {loading && <div>Loading questions...</div>}
      
      {/* Question List */}
      <div className="w-1/3 space-y-4">
        <h1 className="text-2xl font-bold mb-4">Questions</h1>
        {questions.map((question) => (
          <div
            key={question._id}
            onClick={() => handleQuestionClick(question._id)}
            className="p-4 bg-gray-800 rounded-md cursor-pointer hover:bg-cyan-700"
          >
            <h2 className="text-lg font-semibold">{question.title}</h2>
            <p className="text-sm text-gray-400">Points: {question.points}</p>
          </div>
        ))}
      </div>

      {/* Question Details and Answer Submission */}
      <div className="w-2/3 p-4 bg-gray-800 rounded-md">
        <h1 className="text-2xl font-bold mb-4">Question Details</h1>
        {selectedQuestion ? (
          <div>
            <h2 className="text-xl">{selectedQuestion.title}</h2>
            <p className="mt-2">{selectedQuestion.description}</p>
            <p className="mt-2 text-gray-400">Points: {selectedQuestion.points}</p>

            {/* Answer Submission */}
            <div className="mt-4">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your answer"
                className="p-2 rounded bg-gray-700 w-full text-white"
              />
              <button
                onClick={handleAnswerSubmit}
                className="mt-2 bg-cyan-600 text-white rounded-md p-2 w-full hover:bg-cyan-500"
              >
                Submit Answer
              </button>
            </div>

            {/* Submission Result */}
            {submissionResult && (
              <div className="mt-4">
                <p className="text-lg">{submissionResult.message}</p>
              </div>
            )}
          </div>
        ) : (
          <p>Select a question to view its details.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionPage;
