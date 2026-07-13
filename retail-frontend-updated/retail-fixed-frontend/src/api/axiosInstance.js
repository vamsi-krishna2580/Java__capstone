// src/api/axiosInstance.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach access token to every request
api.interceptors.request.use((config) => {
  // const token = localStorage.getItem('accessToken');
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 -> attempt refresh-token flow once, then retry original request
let isRefreshing = false;
let pendingQueue = [];

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const { config, response } = error;
//     if (response?.status === 401 && !config._retry) {
//       config._retry = true;
//       const refreshToken = localStorage.getItem('refreshToken');
//       if (!refreshToken) {
//         localStorage.clear();
//         window.location.href = '/login';
//         return Promise.reject(error);
//       }
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           pendingQueue.push({ resolve, reject, config });
//         });
//       }
//       isRefreshing = true;
//       try {
//         const { data } = await axios.post('/api/v1/auth/refresh-token', { refreshToken });
//         localStorage.setItem('accessToken', data.accessToken);
//         pendingQueue.forEach(({ resolve, config: cfg }) => {
//           cfg.headers.Authorization = `Bearer ${data.accessToken}`;
//           resolve(api(cfg));
//         });
//         pendingQueue = [];
//         config.headers.Authorization = `Bearer ${data.accessToken}`;
//         return api(config);
//       } catch (refreshError) {
//         localStorage.clear();
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }
//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export default api;
