import getClientIP from '../utils/ipHelper.js';
import networkService from '../services/network.service.js';

// Controller functions for network operations

export const getClientIp = async (req, res) => {
  try {
    const localIp = getClientIP(req);
    let publicIp = null;

    // Try to get public IP from external API
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      publicIp = data.ip;
    } catch (error) {
      console.warn('Failed to get public IP:', error.message);
    }

    res.json({ 
      localIp,
      publicIp,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get IP address',
      message: error.message
    });
  }
};

export const ping = (req, res) => {
  try {
    const startTime = Date.now();
    
    // Simple ping response
    res.json({
      message: 'pong',
      timestamp: new Date().toISOString(),
      serverTime: startTime,
      latency: Date.now() - startTime
    });
  } catch (error) {
    res.status(500).json({
      error: 'Ping failed',
      message: error.message
    });
  }
};

export const downloadTest = (req, res) => {
  try {
    const size = parseInt(req.query.size) || 10; // Default 10MB
    
    if (size < 1 || size > 500) {
      return res.status(400).json({
        error: 'Invalid size parameter',
        message: 'Size must be between 1MB and 500MB'
      });
    }

    // Use streaming for better memory efficiency
    networkService.generateDownloadStream(size, res);
    
  } catch (error) {
    res.status(500).json({
      error: 'Download test failed',
      message: error.message
    });
  }
};

export const uploadTest = async (req, res) => {
  try {
    // Get content length from headers
    const contentLength = req.headers['content-length'];
    
    if (!contentLength) {
      return res.status(400).json({
        error: 'Content-Length header is required',
        message: 'Please set Content-Length header for upload test'
      });
    }

    const sizeMB = (parseInt(contentLength) / (1024 * 1024)).toFixed(2);
    
    // Validate upload size (max 100MB)
    if (parseInt(contentLength) > 100 * 1024 * 1024) {
      return res.status(400).json({
        error: 'Upload size too large',
        message: 'Maximum upload size is 100MB'
      });
    }

    // Process upload data using service
    const uploadData = await networkService.processUploadData(req);
    const stats = networkService.getUploadStats(uploadData);

    res.json({
      message: 'Upload completed successfully',
      ...stats,
      expectedSize: contentLength,
      expectedSizeMB: sizeMB
    });
    
  } catch (error) {
    res.status(500).json({
      error: 'Upload test failed',
      message: error.message
    });
  }
};
