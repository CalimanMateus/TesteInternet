// Network service for speed test operations

class NetworkService {
  // Generate random data payload for download test
  generateDownloadPayload(sizeInMB = 10) {
    const chunkSize = 1024 * 1024; // 1MB chunks
    const totalChunks = sizeInMB;
    const chunks = [];
    
    // Create a random string pattern (1KB)
    const pattern = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.repeat(16);
    
    for (let i = 0; i < totalChunks; i++) {
      // Create 1MB chunk
      const chunk = pattern.repeat(1024); // 1KB * 1024 = 1MB
      chunks.push(chunk);
    }
    
    return chunks.join('');
  }

  // Get download data with metadata
  getDownloadData(sizeInMB = 10) {
    const startTime = Date.now();
    const payload = this.generateDownloadPayload(sizeInMB);
    const endTime = Date.now();
    
    return {
      data: payload,
      metadata: {
        size: sizeInMB,
        sizeBytes: sizeInMB * 1024 * 1024,
        generationTime: endTime - startTime,
        timestamp: new Date().toISOString(),
        type: 'download-test'
      }
    };
  }

  // Generate download data stream (memory efficient)
  generateDownloadStream(sizeInMB = 10, res) {
    const chunkSize = 1024 * 1024; // 1MB chunks
    const totalChunks = sizeInMB;
    const pattern = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.repeat(16);
    
    // Set headers for streaming
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-Download-Size', sizeInMB);
    res.setHeader('X-Download-Type', 'speed-test');
    
    let chunksSent = 0;
    
    const sendChunk = () => {
      if (chunksSent >= totalChunks) {
        res.end();
        return;
      }
      
      const chunk = pattern.repeat(1024); // 1MB chunk
      res.write(chunk);
      chunksSent++;
      
      // Use setImmediate to avoid blocking the event loop
      setImmediate(sendChunk);
    };
    
    sendChunk();
  }

  // Process upload data and return statistics
  processUploadData(req) {
    return new Promise((resolve, reject) => {
      let totalSize = 0;
      let chunks = [];
      const startTime = Date.now();
      
      req.on('data', (chunk) => {
        totalSize += chunk.length;
        chunks.push(chunk);
      });
      
      req.on('end', () => {
        const endTime = Date.now();
        const uploadTime = endTime - startTime;
        
        resolve({
          size: totalSize,
          sizeMB: (totalSize / (1024 * 1024)).toFixed(2),
          chunks: chunks.length,
          uploadTime: uploadTime,
          timestamp: new Date().toISOString(),
          type: 'upload-test'
        });
      });
      
      req.on('error', (error) => {
        reject(error);
      });
    });
  }

  // Get upload statistics
  getUploadStats(data) {
    return {
      received: true,
      bytes: data.size,
      megabytes: data.sizeMB,
      chunks: data.chunks,
      uploadTime: data.uploadTime,
      speed: data.size > 0 ? `${(data.size / (data.uploadTime / 1000) / 1024).toFixed(2)} KB/s` : '0 KB/s',
      timestamp: data.timestamp
    };
  }
}

export default new NetworkService();
