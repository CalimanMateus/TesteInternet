import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from './config/index.js';
import logger from './utils/logger.js';
import { errorHandler, notFoundHandler, asyncHandler } from './utils/errors.js';
import requestLogger from './middleware/requestLogger.js';
import speedRoutes from './routes/speed.routes.js';
import networkRoutes from './routes/network.routes.js';

// Create Express app
const app = express();

// Security middleware
if (config.security.helmetEnabled) {
  app.use(helmet());
}

// CORS middleware
app.use(cors(config.cors));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use(requestLogger);

// API Routes
app.use('/api', speedRoutes);
app.use('/api', networkRoutes);

// Health check endpoint
app.get('/health', asyncHandler(async (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: config.server.env
  });
}));

// Root endpoint
app.get('/', asyncHandler(async (req, res) => {
  res.json({ 
    message: 'Speed Test API Server',
    version: '1.0.0',
    environment: config.server.env,
    endpoints: {
      health: '/health',
      api: {
        health: '/api/health',
        ip: '/api/ip',
        ping: '/api/ping',
        download: '/api/download',
        upload: '/api/upload'
      }
    }
  });
}));

// 404 handler
app.use(notFoundHandler);

// Error handling middleware
app.use(errorHandler);

// Start server
const server = app.listen(config.server.port, config.server.host, () => {
  logger.info('Server started successfully', {
    port: config.server.port,
    host: config.server.host,
    environment: config.server.env,
    pid: process.pid
  });
  
  logger.info('Available endpoints:', {
    endpoints: [
      'GET  /health - Health check',
      'GET  / - Server info',
      'GET  /api/health - API health check',
      'GET  /api/ip - Get client IP',
      'GET  /api/ping - Ping test',
      'GET  /api/download - Download test',
      'POST /api/upload - Upload test'
    ]
  });
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  logger.info(`Received ${signal}, starting graceful shutdown`);
  
  server.close(() => {
    logger.info('Server closed successfully');
    process.exit(0);
  });
  
  // Force close after 10 seconds
  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection', { reason, promise });
  process.exit(1);
});

export default app;
