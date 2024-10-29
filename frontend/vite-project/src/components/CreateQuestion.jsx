import React, { useState } from 'react';
import axios from 'axios';

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
      const response = await axios.post('/Admin/questions', formData); // Proxy will handle routing to http://localhost:3000/questions
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
    <div className="p-6 max-w-md mx-auto bg-gray-900 text-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Create New Question</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:border-cyan-500"
            placeholder="Enter question title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:border-cyan-500"
            placeholder="Enter question description"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Points</label>
          <input
            type="number"
            name="points"
            value={formData.points}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:border-cyan-500"
            placeholder="Assign points"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Answer</label>
          <input
            type="text"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:border-cyan-500"
            placeholder="Provide answer"
          />
        </div>
        <button type="submit" className="w-full py-2 mt-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-md">
          Submit Question
        </button>
      </form>
    </div>
  );
};

export default CreateQuestion;
