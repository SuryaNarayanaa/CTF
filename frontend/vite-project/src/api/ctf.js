// src/api/ctf.js
import axios from 'axios';

// Set the base URL for all axios requests
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// Fetch all questions
export const fetchQuestions = async () => {
    try {
      const response = await axios.get('/ctf/questions'); // Assuming '/ctf/questions' is your endpoint
      return response.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }
  };
// Fetch question details by ID
export const fetchQuestionById = async (id) => {
  try {
    const response = await axios.get(`/ctf/questions/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching question by ID:', error);
    throw error;
  }
};

// Submit answer for a question
export const submitAnswer = async (questionId, answer) => {
  try {
    const response = await axios.post('/ctf/submit', {
      questionId,
      answer,
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting answer:', error);
    throw error;
  }
};
