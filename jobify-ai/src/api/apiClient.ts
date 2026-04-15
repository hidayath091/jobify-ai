import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://jobify-ai-w9gw.onrender.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';

    // If unauthorized, we might want to clear local storage/user state
    if (error.response?.status === 401) {
      // Logic handled in stores
    }

    return Promise.reject(message);
  }
);

export default apiClient;
