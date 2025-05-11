// src/axios.js
import axios from 'axios';

// Check if the token exists in localStorage
const token = localStorage.getItem('authToken');

// If token exists, set it in the Authorization header
if (token) {
  axios.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export default axios;
