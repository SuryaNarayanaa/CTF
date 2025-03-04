import React from 'react';
import { X, Shield, Award, Key, Link as LinkIcon, Calendar } from 'lucide-react';

const Question = ({ question, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex justify-center items-center">
      <div className="w-full max-w-2xl p-6 bg-gray-100 rounded-lg border border-green-500/30 
                    shadow-xl shadow-green-500/20">
        {/* Header with Title and Category */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <div className="flex items-center">
              <Shield className="w-6 h-6 text-green-500 mr-2" />
              <h2 className="text-2xl font-bold text-green-500 font-['Press_Start_2P']">
                {question.title}
              </h2>
            </div>
            <span className="text-sm text-gray-600 font-semibold font-['Press_Start_2P']">
              Category: {question.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Description */}
        <div className="bg-gray-200 p-4 rounded-lg border border-green-500/20 mb-4">
          <p className="text-gray-600 font-['Press_Start_2P']">{question.description}</p>
        </div>

        {/* Points and Answer */}
        <div className="flex space-x-6 mb-4">
          <div className="flex items-center text-green-500">
            <Award className="w-5 h-5 mr-2" />
            <span className="font-semibold font-['Press_Start_2P']">Points: {question.points}</span>
          </div>
          <div className="flex items-center text-green-500">
            <Key className="w-5 h-5 mr-2" />
            <span className="font-semibold font-['Press_Start_2P']">
              Answer: {question.answer}
            </span>
          </div>
        </div>

        {/* Links */}
        {question.links.length > 0 && (
          <div className="mb-4">
            <span className="block text-green-500 text-sm font-medium mb-2 font-['Press_Start_2P']">
              Links:
            </span>
            <ul className="list-disc pl-5 space-y-2">
              {question.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline font-['Press_Start_2P']"
                  >
                    <LinkIcon className="inline w-4 h-4 mr-1" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CreatedAt */}
        <div className="flex items-center text-gray-500 mt-4">
          <Calendar className="w-5 h-5 mr-2" />
          <span className="font-['Press_Start_2P']">
            Created At: {new Date(question.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md 
                   transition-all duration-300 flex items-center justify-center space-x-2 font-['Press_Start_2P']"
        >
          <X className="w-4 h-4" />
          <span>Close</span>
        </button>
      </div>
    </div>
  );
};

export default Question;
