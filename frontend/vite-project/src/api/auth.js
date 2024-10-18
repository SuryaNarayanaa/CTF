const API_BASE_URL = '/api/auth';

// Function to sign up a user
export const signup = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to sign up');
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to log in a user
export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Failed to log in');
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Function to log out a user
export const logout = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to log out');
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
