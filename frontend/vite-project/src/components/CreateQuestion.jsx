import React, { useState } from 'react';
import axios from 'axios';
import { Shield, AlertTriangle } from 'lucide-react';

const CreateQuestion = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    points: '',
    answer: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/Admin/questions', formData);
      if (response.status === 201) {
        alert("Question created successfully!");
        setFormData({ title: '', description: '', points: '', answer: '' });
      }
    } catch (error) {
      console.error("Error creating question:", error);
      alert("Failed to create question. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="flex items-center justify-center mb-8">
        <Shield className="w-8 h-8 text-cyan-500 mr-2" />
        <h2 className="text-2xl font-bold text-cyan-500 font-['Press_Start_2P']">
          Create New Question
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="group">
            <label className="block text-cyan-500 text-sm font-medium mb-2 font-['Press_Start_2P']">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-cyan-500/30 rounded-md text-gray-800 
                       focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500
                       placeholder-gray-500 transition-all font-['Press_Start_2P']"
              placeholder="Enter question title"
            />
          </div>

          <div>
            <label className="block text-cyan-500 text-sm font-medium mb-2 font-['Press_Start_2P']">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-cyan-500/30 rounded-md text-gray-800 
                       focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500
                       placeholder-gray-500 transition-all h-32 resize-y font-['Press_Start_2P']"
              placeholder="Enter question description"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-cyan-500 text-sm font-medium mb-2 font-['Press_Start_2P']">
                Points
              </label>
              <input
                type="number"
                name="points"
                value={formData.points}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 border border-cyan-500/30 rounded-md text-gray-800 
                         focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500
                         placeholder-gray-500 transition-all font-['Press_Start_2P']"
                placeholder="Assign points"
              />
            </div>

            <div>
              <label className="block text-cyan-500 text-sm font-medium mb-2 font-['Press_Start_2P']">
                Answer
              </label>
              <input
                type="text"
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 border border-cyan-500/30 rounded-md text-gray-800 
                         focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500
                         placeholder-gray-500 transition-all font-['Press_Start_2P']"
                placeholder="Provide answer"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-md
                   transition-all duration-300 ease-in-out transform hover:scale-[1.02]
                   focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50
                   shadow-lg hover:shadow-cyan-500/50 mt-8 font-['Press_Start_2P']"
        >
          <div className="flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            <span>Submit Question</span>
          </div>
        </button>
      </form>

      {/* Decorative Elements */}
      <div className="mt-12 flex justify-center space-x-2">
        <div className="w-2 h-2 bg-cyan-500/50 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-cyan-500/50 rounded-full animate-pulse delay-75"></div>
        <div className="w-2 h-2 bg-cyan-500/50 rounded-full animate-pulse delay-150"></div>
      </div>
    </div>
  );
};

export default CreateQuestion;