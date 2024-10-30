// src/api/auth.js
import axios from 'axios';

// Set the base URL for all axios requests
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/auth`,
});

// Function to sign up a user
export const signup = async (userData) => {
  try {
    const { data } = await api.post('/signup', userData);
    return data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Function to log in a user
export const login = async (credentials) => { try {
  const response = await axios.post('/login', {
    email: credentials.email,
    password: credentials.password, // Replace with actual password input
  });

  localStorage.setItem('token', response.data.token);
  return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Function to log out a user
export const logout = async () => {
  try {
    await axios.post('/logout', {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    localStorage.removeItem('token');
    return true;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
