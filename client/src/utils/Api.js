// src/utils/Api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

export const signup = async (formData) => { 
  const response = await axios.post(`${API_URL}/signup`, formData);
  return response.data;
};

export const signin = async (credentials) => {
  const response = await axios.post(`${API_URL}/signin`, credentials);
  return response.data;
};
