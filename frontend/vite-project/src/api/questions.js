import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/admin/questions`
});

export const getAllQuestions = async () => {
  try {
    const response = await api.get('/'); 
    return response.data;
  } catch (error) {
    console.error('Failed to fetch questions', error);
    throw error;
  }
};

export const createQuestion = async (questionData) => {
  try {
    const response = await api.post('/', questionData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create question', error);
    throw error;
  }
};

export const updateQuestion = async (questionData) => {
  try {
    const response = await api.put("/", questionData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update question', error);
    throw error;
  }
};

export const getQuestionsByCategory = async () => {
try{
  const resposne  = await api.get('/questionsByCategory');
  return response.data;
}
catch(error){
  console.error('Failed to fetch questions by category', error);
  throw error;

}
};