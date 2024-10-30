import axios from 'axios';
const baseUrl = "http://localhost:3000/ctf/submit";

const sendRequests = async () => {
    for (let i = 0; i < 2; i++) {
        const username = `suryaa${i}`; // Unique username
        const email = `23n256a${i}@example.com`; // Unique email

        let data = {
    "teamName" :email,
    "title" : i,
		"answer":i
}

        try {
            const response = await axios.post(baseUrl, data);
            console.log(`Response for ${username}:`, response.data);
        } catch (error) {
            console.error(`Error for ${username}:`, error.response ? error.response.data : error.message);
        }
    }
};

// Start sending requests
sendRequests();
