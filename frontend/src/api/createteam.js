import axios from 'axios';

// Set the base URL for all axios requests
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/team`, // Adjust the base URL as needed
});

// Function to create a new team
export const createTeam = async (teamData) => {
  try {
    const response = await api.post('/create', teamData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      console.error('Team name already exists:', error);
    } else {
      console.error('Error creating team:', error);
    }
    throw error;
  }
};