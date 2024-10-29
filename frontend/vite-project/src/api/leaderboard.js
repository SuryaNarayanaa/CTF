import axios from 'axios';

// Vite automatically loads env variables prefixed with VITE_
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const getLeaderboard = async () => {
    try {
        const response = await axios.get('/Admin/leaderboard');
        return response.data;  // Ensure this is an array or adjust accordingly
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        throw error;
    }
};
