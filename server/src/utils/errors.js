import logger from './logger.js';

/**
 * Custom error classes for better error handling
 */

/**
 * Base application error
 */
class AppError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Validation error
 */
class ValidationError extends AppError {
  constructor(message, field = null) {
    super(message, 400, 'VALIDATION_ERROR');
    this.field = field;
  }
}

/**
 * Not found error
 */
class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

/**
 * Rate limit error
 */
class RateLimitError extends AppError {
  constructor(message = 'Rate limit exceeded') {
    super(message, 429, 'RATE_LIMIT_EXCEEDED');
  }
}

/**
 * File size error
 */
class FileSizeError extends AppError {
  constructor(maxSize) {
    super(`File size exceeds maximum allowed size of ${maxSize}MB`, 413, 'FILE_SIZE_EXCEEDED');
    this.maxSize = maxSize;
  }
}

/**
 * Error handler middleware
 * Centralized error handling for Express
 */
const errorHandler = (err, req, res, next) => {
  // Log error
  logger.error('Error occurred', err, {
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Default error response
  let statusCode = err.statusCode || 500;
  let code = err.code || 'INTERNAL_ERROR';
  let message = err.message || 'Internal server error';

  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    code = 'VALIDATION_ERROR';
    message = err.message;
  } else if (err.name === 'CastError') {
    statusCode = 400;
    code = 'INVALID_ID';
    message = 'Invalid ID format';
  } else if (err.code === 'ENOENT') {
    statusCode = 404;
    code = 'FILE_NOT_FOUND';
    message = 'File not found';
  } else if (err.code === 'EACCES') {
    statusCode = 403;
    code = 'PERMISSION_DENIED';
    message = 'Permission denied';
  }

  // Don't expose internal errors in production
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    message = 'Internal server error';
  }

  const errorResponse = {
    error: {
      code,
      message,
      timestamp: new Date().toISOString()
    }
  };

  // Add additional fields for specific errors
  if (err.field) {
    errorResponse.error.field = err.field;
  }

  if (err.maxSize) {
    errorResponse.error.maxSize = err.maxSize;
  }

  // Include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    errorResponse.error.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
};

/**
 * Async error wrapper
 * Wraps async functions to catch errors automatically
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * 404 handler
 */
const notFoundHandler = (req, res) => {
  const error = new NotFoundError(`Route ${req.originalUrl}`);
  res.status(404).json({
    error: {
      code: error.code,
      message: error.message,
      timestamp: new Date().toISOString()
    }
  });
};

export {
  AppError,
  ValidationError,
  NotFoundError,
  RateLimitError,
  FileSizeError,
  errorHandler,
  asyncHandler,
  notFoundHandler
};
