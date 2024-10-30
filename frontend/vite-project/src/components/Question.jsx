import React from 'react';

const Question = ({ question, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="w-3/4 max-w-lg p-6 bg-gray-800 text-white rounded-lg">
        <h2 className="text-2xl font-bold mb-2">{question.title}</h2>
        <p className="text-gray-300">{question.description}</p>
        <div className="mt-4">
          <p className="font-semibold">Points: {question.points}</p>
          <p className="font-semibold">Answer: {question.answer}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Question;
