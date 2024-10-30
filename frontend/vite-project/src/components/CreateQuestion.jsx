import React, { useState } from 'react';
import axios from 'axios';
import { Shield, AlertTriangle } from 'lucide-react';

const CreateQuestion = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    points: '',
    answer: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-center mb-6">
        <Shield className="w-8 h-8 text-cyan-400 mr-2" />
        <h2 className="text-2xl font-bold text-cyan-400">Create New Question</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="group">
          <label className="block text-cyan-400 text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-cyan-400/30 rounded-md text-white 
                     focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400
                     placeholder-gray-500 transition-all"
            placeholder="Enter question title"
          />
        </div>

        <div>
          <label className="block text-cyan-400 text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-cyan-400/30 rounded-md text-white 
                     focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400
                     placeholder-gray-500 transition-all h-32"
            placeholder="Enter question description"
          ></textarea>
        </div>

        <div>
          <label className="block text-cyan-400 text-sm font-medium mb-2">Points</label>
          <input
            type="number"
            name="points"
            value={formData.points}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-cyan-400/30 rounded-md text-white 
                     focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400
                     placeholder-gray-500 transition-all"
            placeholder="Assign points"
          />
        </div>

        <div>
          <label className="block text-cyan-400 text-sm font-medium mb-2">Answer</label>
          <input
            type="text"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-cyan-400/30 rounded-md text-white 
                     focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400
                     placeholder-gray-500 transition-all"
            placeholder="Provide answer"
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-md
                   transition-all duration-300 ease-in-out transform hover:scale-[1.02]
                   focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50
                   shadow-lg hover:shadow-cyan-400/50"
        >
          <div className="flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Submit Question
          </div>
        </button>
      </form>
    </div>
  );
};

export default CreateQuestion;