// Vite automatically loads env variables prefixed with VITE_

export const getLeaderboard = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}home/leaderboard`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const result = await response.json();
        if (result.success) {
            return Array.isArray(result.data) ? result.data : [];
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        throw error;
    }
};