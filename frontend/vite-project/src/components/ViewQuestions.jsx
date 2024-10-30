import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question';
import { Database, Trash2, Edit2 } from 'lucide-react';

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
    <div className="w-full">
      <div className="flex items-center justify-center mb-6">
        <Database className="w-8 h-8 text-cyan-500 mr-2" />
        <h2 className="text-2xl font-bold text-cyan-500 font-['Press_Start_2P']">
          Question Database
        </h2>
      </div>

      <div className="grid gap-4">
        {questions.map((question) => (
          <div
            key={question._id}
            className="p-4 bg-gray-100 rounded-lg border border-cyan-500/30 hover:border-cyan-500 
                     transition-all duration-300 cursor-pointer group"
            onClick={() => handleSelectQuestion(question)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-cyan-500 group-hover:text-cyan-400 font-['Press_Start_2P']">
                {question.title}
              </h3>
              <span className="text-sm text-cyan-500/70 font-['Press_Start_2P']">
                Points: {question.points}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2 font-['Press_Start_2P']">
              {question.description.substring(0, 100)}...
            </p>
          </div>
        ))}
      </div>

      {selectedQuestion && (
        <div className="flex space-x-4 mt-6 justify-center">
          <button
            onClick={() => setShowDetails(true)}
            className="px-6 py-2 bg-cyan-500 text-white font-bold rounded-md hover:bg-cyan-600 
                     transition-all duration-300 flex items-center space-x-2 font-['Press_Start_2P']"
          >
            <Edit2 className="w-4 h-4" />
            <span>Update</span>
          </button>
          <button
            onClick={handleDeleteQuestion}
            className="px-6 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 
                     transition-all duration-300 flex items-center space-x-2 font-['Press_Start_2P']"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
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