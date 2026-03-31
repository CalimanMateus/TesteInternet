import logger from '../utils/logger.js';

/**
 * Request logging middleware
 * Logs HTTP requests with timing information
 */
const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  
  // Store original end function
  const originalEnd = res.end;
  
  // Override end function to log response
  res.end = function(...args) {
    const duration = Date.now() - startTime;
    
    // Log the request
    logger.logRequest(req, res, duration);
    
    // Call original end function
    originalEnd.apply(this, args);
  };
  
  next();
};

export default requestLogger;
