import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question';

const ViewQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/Admin/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleSelectQuestion = (question) => {
    setSelectedQuestion(question);
    setShowDetails(true);
  };

  const handleDeleteQuestion = async () => {
    if (selectedQuestion) {
      try {
        await axios.delete(`/Admin/questions/${selectedQuestion._id}`);
        setQuestions(questions.filter((q) => q._id !== selectedQuestion._id));
        setSelectedQuestion(null);
        alert("Question deleted successfully.");
      } catch (error) {
        console.error("Error deleting question:", error);
      }
    }
  };

  return (
    <div className="w-full h-full p-6 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-4">Questions</h2>
      <div className="grid grid-cols-1 gap-4">
        {questions.map((question) => (
          <div
            key={question._id}
            className={`p-4 bg-gray-800 rounded-md cursor-pointer hover:bg-green-700 ${selectedQuestion?._id === question._id ? 'bg-green-600' : ''}`}
            onClick={() => handleSelectQuestion(question)}
          >
            <h3 className="text-lg font-semibold">{question.title}</h3>
            <p className="text-sm text-gray-300">{question.description.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
      {selectedQuestion && (
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => setShowDetails(true)}
            className="px-4 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-700"
          >
            Update
          </button>
          <button
            onClick={handleDeleteQuestion}
            className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}
      {showDetails && (
        <Question question={selectedQuestion} onClose={() => setShowDetails(false)} />
      )}
    </div>
  );
};

export default ViewQuestions;
