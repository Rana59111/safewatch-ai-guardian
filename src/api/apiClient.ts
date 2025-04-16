
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_BASE_URL, REQUEST_TIMEOUT } from './config';
import { toast } from '@/components/ui/sonner';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - can be used to add auth tokens
apiClient.interceptors.request.use(
  (config) => {
    // You can add authentication token here when you implement auth
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { response } = error;
    
    if (!response) {
      toast.error('Network Error', {
        description: 'Unable to connect to the server. Please check your internet connection.'
      });
    } else if (response.status === 401) {
      toast.error('Authentication Error', {
        description: 'Your session has expired. Please log in again.'
      });
      // You can redirect to login or dispatch logout action here
    } else if (response.status === 403) {
      toast.error('Access Denied', {
        description: 'You do not have permission to perform this action.'
      });
    } else if (response.status === 500) {
      toast.error('Server Error', {
        description: 'Something went wrong on our server. We\'re working to fix it.'
      });
    }
    
    return Promise.reject(error);
  }
);

// Helper methods for API requests
export const apiService = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.get<T, AxiosResponse<T>>(url, config).then(response => response.data);
  },
  
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.post<T, AxiosResponse<T>>(url, data, config).then(response => response.data);
  },
  
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.put<T, AxiosResponse<T>>(url, data, config).then(response => response.data);
  },
  
  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.patch<T, AxiosResponse<T>>(url, data, config).then(response => response.data);
  },
  
  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.delete<T, AxiosResponse<T>>(url, config).then(response => response.data);
  }
};

export default apiClient;
