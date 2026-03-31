import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Application configuration
 * Centralized configuration management
 */
const config = {
  // Server configuration
  server: {
    port: process.env.PORT || 3001,
    env: process.env.NODE_ENV || 'development',
    host: process.env.HOST || 'localhost'
  },

  // CORS configuration
  cors: {
    origin: process.env.CORS_ORIGIN || ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  },

  // Security configuration
  security: {
    helmetEnabled: process.env.HELMET_ENABLED !== 'false',
    rateLimitEnabled: process.env.RATE_LIMIT_ENABLED !== 'false'
  },

  // Speed test configuration
  speedTest: {
    maxUploadSize: parseInt(process.env.MAX_UPLOAD_SIZE) || 100, // MB
    defaultDownloadSize: parseInt(process.env.DEFAULT_DOWNLOAD_SIZE) || 10, // MB
    defaultUploadSize: parseInt(process.env.DEFAULT_UPLOAD_SIZE) || 5, // MB
    pingMeasurements: parseInt(process.env.PING_MEASUREMENTS) || 5,
    pingInterval: parseInt(process.env.PING_INTERVAL) || 200 // ms
  },

  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    enabled: process.env.LOGGING_ENABLED !== 'false'
  }
};

// Validation
if (config.server.port < 1 || config.server.port > 65535) {
  throw new Error('Invalid port number in configuration');
}

if (config.speedTest.maxUploadSize < 1 || config.speedTest.maxUploadSize > 1000) {
  throw new Error('Max upload size must be between 1MB and 1000MB');
}

export default config;
