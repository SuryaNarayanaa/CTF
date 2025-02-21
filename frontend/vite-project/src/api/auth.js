// src/api/auth.js
import axios from 'axios';

// Set the base URL for all axios requests
const api = axios.create({
  baseURL: `/api`,
});




// Function to log in a user
export const login = async (credentials) => { 
  try {
    const {data:{data,success,message}} = await api.post('/auth/login', {
      email: credentials.email,
      password: credentials.password,
    });
    console.log(data);
    if(!success) throw new Error(message);
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};




export const signup = async (userData) => {
  try {
    const { data:{data,message,success} } = await fetch('/api/auth/login')
    if(!success) throw new Error(message);
    return data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Function to log out a user
export const logout = async () => {
  try {
    const response = await fetch('/api/auth/logout')
    const {data,message,success} = await response.json()
    if(!success) throw new Error(message);
    return data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};