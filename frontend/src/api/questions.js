import axios from 'axios';

// Set up the base URL using environment variables
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/Admin/questions`
});

// Function to fetch all questions
export const getAllQuestions = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    handleApiError('Failed to fetch questions', error);
    throw error;
  }
};

// Function to create a question
export const createQuestion = async (questionData) => {
  try {
    const response = await api.post('/', questionData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    handleApiError('Failed to create question', error);
    throw error;
  }
};

// Function to update a question
export const updateQuestion = async (questionData) => {
  try {
    const response = await api.put("/", questionData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    handleApiError('Failed to update question', error);
    throw error;
  }
};

// Function to fetch questions by category
export const getQuestionsByCategory = async () => {
  try {
    const response = await api.get('/questionsByCategory');
    return response.data;
  } catch (error) {
    handleApiError('Failed to fetch questions by category', error);
    throw error;
  }
};

// Error handling function
const handleApiError = (message, error) => {
  console.error(message);

  if (error.response) {
    // The request was made, but the server responded with a status code outside the range of 2xx
    console.error(`Error Status: ${error.response.status}`);
    console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
    console.error(`Error Headers: ${JSON.stringify(error.response.headers)}`);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No response received:', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error', error.message);
  }

  // Provide additional details on CORS or network issues
  if (error.message.includes('Network Error')) {
    console.error('Network error - please check if the backend server is reachable.');
  }
  if (error.message.includes('CORS')) {
    console.error('CORS error - verify that the backend allows requests from this origin.');
  }
};
