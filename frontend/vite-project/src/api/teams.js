import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_API_URL;


export const fetchTeams = async () => {
    try {
        const response = await axios.get('/team/all');
        console.log('Fetched teams:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching teams:', error);
        throw error;
    }
};