import React from 'react';
import { X, Shield, Award, Key } from 'lucide-react';

const Question = ({ question, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center">
      <div className="w-full max-w-2xl p-6 bg-gray-800 rounded-lg border border-cyan-400/30 
                    shadow-xl shadow-cyan-400/20">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Shield className="w-6 h-6 text-cyan-400 mr-2" />
            <h2 className="text-2xl font-bold text-cyan-400">{question.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-900 p-4 rounded-lg border border-cyan-400/20">
            <p className="text-gray-300">{question.description}</p>
          </div>

          <div className="flex space-x-6">
            <div className="flex items-center text-cyan-400">
              <Award className="w-5 h-5 mr-2" />
              <span className="font-semibold">Points: {question.points}</span>
            </div>
            <div className="flex items-center text-cyan-400">
              <Key className="w-5 h-5 mr-2" />
              <span className="font-semibold">Answer: {question.answer}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-md 
                   transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <X className="w-4 h-4" />
          <span>Close</span>
        </button>
      </div>
    </div>
  );
};

export default Question;