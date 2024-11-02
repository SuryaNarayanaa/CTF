// src/api/auth.js
import axios from 'axios';

// Set the base URL for all axios requests
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/auth`,
});




// Function to log in a user
export const login = async (credentials) => { 
  try {
    const response = await api.post('/login', {
      email: credentials.email,
      password: credentials.password,
    });

    // Store token, user role, and user ID in localStorage
    localStorage.setItem('token', response.data.token); // Assuming the token is returned in the response
    localStorage.setItem('userRole', response.data.user.role); // Store role
    localStorage.setItem('userId', response.data.user._id);    // Store user ID if needed
    localStorage.setItem('username', response.data.user.username); // Store username

    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};




export const signup = async (userData) => {
  try {
    const { data } = await api.post('/signup', userData);
    return data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Function to log out a user
export const logout = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    await api.post('/logout', {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.removeItem('token');
    return true;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};