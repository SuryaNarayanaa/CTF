const API_BASE_URL = '/api/admin/questions';

export const fetchQuestions = async () => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createQuestion = async (questionData) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questionData),
    });

    if (!response.ok) {
      throw new Error('Failed to create question');
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
