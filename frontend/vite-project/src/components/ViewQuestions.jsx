import React, { useState, useEffect } from 'react';
import { Database, Trash2, AlertCircle } from 'lucide-react';

const ViewQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/Admin/questions',{method:'GET',credentials:'include'});
        const json=await response.json();
        setQuestions(json.data);
      } catch (error) {
        setError("Error fetching questions");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleSelectQuestion = (question) => {
    setSelectedQuestion(question);
    setShowDetails(true);
  };

  const handleDeleteQuestion = async () => {
    if (!selectedQuestion) return;

    try {
      await fetch(`/back/Admin/questions/${selectedQuestion._id}`,{method:'DELETE'});
      setQuestions(questions.filter((q) => q._id !== selectedQuestion._id));
      setSelectedQuestion(null);
      setShowDetails(false);

      // Toast notification instead of alert
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg';
      notification.textContent = 'Question deleted successfully';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-gray-500">
        <div className="loader"></div>
        <p className="ml-2">Loading questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12 text-red-500">
        <AlertCircle className="w-12 h-12 mb-4" />
        <p className="text-lg font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-center mb-8">
        <Database className="w-6 h-6 text-emerald-500" />
        <h2 className="ml-2 text-xl font-['Press_Start_2P'] text-emerald-600">
          Questions Database
        </h2>
      </div>

      {/* Questions Grid */}
      <div className="space-y-4">
        {questions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <AlertCircle className="w-12 h-12 mb-4 text-emerald-400" />
            <p className="text-lg font-medium">No questions available</p>
          </div>
        ) : (
          questions.map((question) => (
            <div
              key={question._id}
              onClick={() => handleSelectQuestion(question)}
              className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 
                       hover:border-emerald-400 transition-all duration-200 cursor-pointer"
            >
              <div className="p-4">
                {/* Question Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {question.title}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      {question.category}
                    </span>
                  </div>
                  <div className="ml-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {question.points} Points
                    </span>
                  </div>
                </div>

                {/* Question Description */}
                <p className="text-sm text-gray-600 line-clamp-2">
                  {question.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Question Details Modal */}
      {showDetails && selectedQuestion && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Question Details
                </h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Question Content */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Title</h4>
                  <p className="mt-1 text-sm text-gray-900">{selectedQuestion.title}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Category</h4>
                  <p className="mt-1 text-sm text-gray-900">{selectedQuestion.category}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Description</h4>
                  <p className="mt-1 text-sm text-gray-900">{selectedQuestion.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Points</h4>
                  <p className="mt-1 text-sm text-gray-900">{selectedQuestion.points}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Answer</h4>
                  <p className="mt-1 text-sm text-gray-900">{selectedQuestion.answer}</p>
                </div>

                {selectedQuestion.links?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Resource Links</h4>
                    <div className="mt-1 space-y-1">
                      {selectedQuestion.links.map((link, index) => (
                        <p key={index} className="text-sm text-emerald-600 hover:text-emerald-700">
                          {link}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-end space-x-3">
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md
                           transition-colors duration-200 font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteQuestion}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md
                           transition-colors duration-200 font-medium text-sm flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Question
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewQuestions;