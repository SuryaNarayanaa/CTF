import React, { useState } from 'react';
import axios from 'axios';
import { Shield, AlertTriangle } from 'lucide-react';

const CreateQuestion = () => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    points: '',
    answer: '',
    links: [''],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === 'links' ? [e.target.value] : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/Admin/questions', formData);
      if (response.status === 201) {
        alert("Question created successfully!");
        setFormData({ category: '', title: '', description: '', points: '', answer: '', links: [''] });
      }
    } catch (error) {
      console.error("Error creating question:", error);
      alert("Failed to create question. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-center mb-6">
        <Shield className="w-6 h-6 text-emerald-500" />
        <h2 className="ml-2 text-xl font-['Press_Start_2P'] text-emerald-600">
          Create Question
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form Fields with Refined Styling */}
        <div className="space-y-4">
          {/* Category Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900
                       focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                       placeholder-gray-400 transition-all duration-200 font-sans"
              placeholder="Enter category"
            />
          </div>

          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900
                       focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                       placeholder-gray-400 transition-all duration-200 font-sans"
              placeholder="Enter title"
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900
                       focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                       placeholder-gray-400 transition-all duration-200 font-sans h-32 resize-y"
              placeholder="Enter description"
            ></textarea>
          </div>

          {/* Points and Answer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Points
              </label>
              <input
                type="number"
                name="points"
                value={formData.points}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900
                         focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                         placeholder-gray-400 transition-all duration-200 font-sans"
                placeholder="Enter points"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Answer
              </label>
              <input
                type="text"
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900
                         focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                         placeholder-gray-400 transition-all duration-200 font-sans"
                placeholder="Enter answer"
              />
            </div>
          </div>

          {/* Links Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resource Links
            </label>
            <input
              type="text"
              name="links"
              value={formData.links}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900
                       focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                       placeholder-gray-400 transition-all duration-200 font-sans"
              placeholder="Enter resource links (comma-separated)"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-md
                   transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
                   flex items-center justify-center space-x-2"
        >
          <AlertTriangle className="w-5 h-5" />
          <span className="font-sans">Submit Question</span>
        </button>
      </form>
    </div>
  );
};

export default CreateQuestion;