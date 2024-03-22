import axios from 'axios';
import router from '@/router';
import { useToast } from 'vue-toastification';

const toast = useToast();

// Create Axios instance
const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    response => {

      return response;
    },
    error => {
      if (error.response.status === 401) {
        // Token expired or invalid, redirect to login
        localStorage.removeItem('jwt');
        router.push('/login');
        toast.error('Unauthorized Request')
      }
      return Promise.reject(error);
    }
  );

// Add a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // Get the token from local storage
    const token = localStorage.getItem('jwt');
    // If token exists, add it to the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
