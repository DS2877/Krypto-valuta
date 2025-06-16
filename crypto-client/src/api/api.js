import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Registrera
export const register = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
  return response.data;
};

// Logga in
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

// skyddad data
export const getProtected = async (token) => {
  const response = await axios.get(`${API_URL}/protected`, {
    headers: { Authorization: `Bearer ${token}` }, // token i header
  });
  return response.data;
};