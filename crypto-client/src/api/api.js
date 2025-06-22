import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Login
export async function login(credentials) {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
}

// Register
export async function register(credentials) {
  const response = await axios.post(`${API_URL}/auth/register`, credentials);
  return response.data;
}


export async function getProtected(token) {
  const response = await axios.get(`${API_URL}/protected`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}


export default {
  login,
  register,
  getProtected,
};