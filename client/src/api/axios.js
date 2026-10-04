import axios from 'axios';

// Note: For production deployment, set the VITE_API_URL environment variable.
// It MUST include the /api suffix (e.g., https://your-backend.onrender.com/api)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || `http://${window.location.hostname}:5000/api`
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
