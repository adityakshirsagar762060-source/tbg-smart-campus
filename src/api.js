import axios from 'axios';

// Yeh tumhara live Render backend link hai
const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://smart-campus-backend-9rlu.onrender.com';

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default API;