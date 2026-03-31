/**
 * Frontend configuration
 * Centralized configuration management for React application
 */

const config = {
  // API configuration
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
    retries: parseInt(import.meta.env.VITE_API_RETRIES) || 3
  },

  // Speed test configuration
  speedTest: {
    defaultDownloadSize: parseInt(import.meta.env.VITE_DEFAULT_DOWNLOAD_SIZE) || 10, // MB
    defaultUploadSize: parseInt(import.meta.env.VITE_DEFAULT_UPLOAD_SIZE) || 5, // MB
    pingMeasurements: parseInt(import.meta.env.VITE_PING_MEASUREMENTS) || 5,
    pingInterval: parseInt(import.meta.env.VITE_PING_INTERVAL) || 200, // ms
    maxUploadSize: parseInt(import.meta.env.VITE_MAX_UPLOAD_SIZE) || 100 // MB
  },

  // UI configuration
  ui: {
    theme: import.meta.env.VITE_THEME || 'light',
    language: import.meta.env.VITE_LANGUAGE || 'pt-BR',
    animations: import.meta.env.VITE_ANIMATIONS !== 'false'
  },

  // Feature flags
  features: {
    advancedMetrics: import.meta.env.VITE_ADVANCED_METRICS !== 'false',
    debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
    analytics: import.meta.env.VITE_ANALYTICS === 'true'
  }
};

// Validation
if (config.api.timeout < 1000 || config.api.timeout > 60000) {
  console.warn('API timeout should be between 1000ms and 60000ms');
}

if (config.speedTest.maxUploadSize < 1 || config.speedTest.maxUploadSize > 1000) {
  console.warn('Max upload size should be between 1MB and 1000MB');
}

export default config;
