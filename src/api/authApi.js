import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Login API call
export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

// Logout API call
export const logout = () => {
  localStorage.removeItem('token');
  window.location.reload();
};
