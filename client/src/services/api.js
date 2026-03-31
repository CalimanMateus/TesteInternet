import axios from 'axios';
import config from '../config/index.js';

/**
 * API service configuration
 * Centralized HTTP client with interceptors and error handling
 */

// Create axios instance with configuration
const api = axios.create({
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      status: error.response?.status,
      message: error.response?.data?.error?.message || error.message,
      url: error.config?.url
    });
    return Promise.reject(error);
  }
);

// Network API methods
export const networkAPI = {
  /**
   * Get client IP address
   */
  getIp: () => api.get('/ip'),
  
  /**
   * Perform ping test
   */
  ping: () => api.get('/ping'),
  
  /**
   * Perform download test
   * @param {number} sizeMB - Download size in MB
   */
  download: (sizeMB = config.speedTest.defaultDownloadSize) => api.get(`/download?size=${sizeMB}`, {
    responseType: 'blob',
    onDownloadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Download progress: ${progress}%`);
      }
    }
  }),
  
  /**
   * Perform upload test
   * @param {Blob} data - Data to upload
   * @param {number} size - Size in bytes
   */
  upload: (data, size) => api.post('/upload', data, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length': size.toString()
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Upload progress: ${progress}%`);
      }
    }
  }),
  
  /**
   * Health check
   */
  health: () => api.get('/health')
};

export default api;
