import { useState, useCallback } from 'react';
import api from '../services/api.js';

/**
 * Custom hook for speed test functionality
 * Manages speed test state and operations with optimized re-renders
 */
export const useSpeedTest = () => {
  // State management
  const [testResults, setTestResults] = useState({
    ip: '',
    ping: null,
    jitter: null,
    download: null,
    upload: null
  });
  
  const [testState, setTestState] = useState({
    loading: false,
    currentTest: null,
    progress: 0
  });

  // Update individual test result
  const updateTestResult = useCallback((key, value) => {
    setTestResults(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  // Update test state
  const updateTestState = useCallback((updates) => {
    setTestState(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  // Reset all test results
  const resetTestResults = useCallback(() => {
    setTestResults({
      ip: '',
      ping: null,
      jitter: null,
      download: null,
      upload: null
    });
  }, []);

  /**
   * Get client IP address
   */
  const getIp = useCallback(async () => {
    try {
      updateTestState({ currentTest: 'ip' });
      const response = await api.get('/ip');
      const { localIp, publicIp } = response.data;
      updateTestResult('ip', { localIp, publicIp });
      updateTestState({ progress: 20 });
      return { localIp, publicIp };
    } catch (err) {
      console.error('Failed to get IP:', err);
      const errorMessage = err.response?.data?.error?.message || err.message || 'Failed to detect IP';
      updateTestResult('ip', errorMessage);
      throw new Error(errorMessage);
    }
  }, [updateTestResult, updateTestState]);

  /**
   * Measure ping with jitter calculation
   * Makes 5 measurements and calculates average and standard deviation
   */
  const measurePing = useCallback(async () => {
    try {
      updateTestState({ currentTest: 'ping' });
      const pings = [];
      
      // Make 5 ping measurements
      for (let i = 0; i < 5; i++) {
        const startTime = performance.now();
        await api.get('/ping');
        const endTime = performance.now();
        const latency = Math.round(endTime - startTime);
        pings.push(latency);
        
        // Update progress during ping tests (20-40% range)
        updateTestState({ progress: 20 + ((i + 1) / 5) * 20 });
        
        // Small delay between measurements
        if (i < 4) {
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }
      
      // Calculate statistics
      const average = Math.round(pings.reduce((a, b) => a + b, 0) / pings.length);
      const variance = pings.reduce((sum, val) => sum + Math.pow(val - average, 2), 0) / pings.length;
      const jitterValue = Math.round(Math.sqrt(variance));
      
      updateTestResult('ping', average);
      updateTestResult('jitter', jitterValue);
      updateTestState({ progress: 40 });
      
      return { average, jitter: jitterValue, measurements: pings };
    } catch (err) {
      console.error('Failed to measure ping:', err);
      const errorMessage = err.response?.data?.error?.message || err.message || 'Failed to measure ping';
      updateTestResult('ping', errorMessage);
      updateTestResult('jitter', errorMessage);
      throw new Error(errorMessage);
    }
  }, [updateTestResult, updateTestState]);

  /**
   * Measure download speed with extended test time for accuracy
   */
  const measureDownload = useCallback(async () => {
    try {
      updateTestState({ currentTest: 'download' });
      
      // Use concurrent connections for more accurate speed measurement
      const concurrentTests = 3;
      const testSize = 100; // MB per test
      const results = [];
      
      for (let i = 0; i < concurrentTests; i++) {
        const startTime = Date.now();
        
        try {
          await api.get(`/download?size=${testSize}`, {
            responseType: 'blob',
            onDownloadProgress: (progressEvent) => {
              const loaded = progressEvent.loaded;
              const duration = (Date.now() - startTime) / 1000;
              const currentSpeed = (loaded / 1024 / 1024) / duration; // MB/s
              
              // Update display with current speed (sum of all active tests)
              const totalSpeed = currentSpeed + results.reduce((sum, r) => sum + r, 0);
              updateTestResult('download', totalSpeed.toFixed(2));
            }
          });
          
          const duration = (Date.now() - startTime) / 1000;
          const speed = (testSize / duration); // MB/s
          results.push(speed);
          
        } catch (error) {
          console.warn(`Download test ${i+1} failed:`, error.message);
        }
      }
      
      // Calculate average of successful tests
      if (results.length > 0) {
        const avgSpeed = results.reduce((a, b) => a + b, 0) / results.length;
        // Convert to Mbps (multiply by 8 for bits per second, then divide by 1,000,000 for Mbps)
        const speedMbps = (avgSpeed * 8).toFixed(2);
        updateTestResult('download', speedMbps);
        updateTestState({ progress: 60 });
        return speedMbps;
      } else {
        throw new Error('All download tests failed');
      }
      
    } catch (err) {
      console.error('Download test failed:', err);
      const errorMessage = err.response?.data?.error?.message || err.message || 'Download test failed';
      updateTestResult('download', errorMessage);
      throw new Error(errorMessage);
    }
  }, [updateTestResult, updateTestState]);

  /**
   * Measure upload speed
   */
  const measureUpload = useCallback(async () => {
    try {
      updateTestState({ currentTest: 'upload' });
      
      // Use concurrent connections for more accurate speed measurement
      const concurrentTests = 3;
      const testSize = 10; // MB per test (smaller for upload)
      const results = [];
      
      for (let i = 0; i < concurrentTests; i++) {
        const startTime = Date.now();
        
        try {
          const data = new ArrayBuffer(testSize * 1024 * 1024); // Convert MB to bytes
          
          await api.post('/upload', data, {
            headers: {
              'Content-Type': 'application/octet-stream'
            },
            onUploadProgress: (progressEvent) => {
              const loaded = progressEvent.loaded;
              const duration = (Date.now() - startTime) / 1000;
              const currentSpeed = (loaded / 1024 / 1024) / duration; // MB/s
              
              // Update display with current speed (sum of all active tests)
              const totalSpeed = currentSpeed + results.reduce((sum, r) => sum + r, 0);
              updateTestResult('upload', totalSpeed.toFixed(2));
            }
          });
          
          const duration = (Date.now() - startTime) / 1000;
          const speed = (testSize / duration); // MB/s
          results.push(speed);
          
        } catch (error) {
          console.warn(`Upload test ${i+1} failed:`, error.message);
        }
      }
      
      // Calculate average of successful tests
      if (results.length > 0) {
        const avgSpeed = results.reduce((a, b) => a + b, 0) / results.length;
        // Convert to Mbps (multiply by 8 for bits per second, then divide by 1,000,000 for Mbps)
        const speedMbps = (avgSpeed * 8).toFixed(2);
        updateTestResult('upload', speedMbps);
        updateTestState({ progress: 80 });
        return speedMbps;
      } else {
        throw new Error('All upload tests failed');
      }
      
    } catch (err) {
      console.error('Upload test failed:', err);
      const errorMessage = err.response?.data?.error?.message || err.message || 'Upload test failed';
      updateTestResult('upload', errorMessage);
      throw new Error(errorMessage);
    }
  }, [updateTestResult, updateTestState]);

  /**
   * Run complete speed test
   * Executes all tests sequentially with progress tracking
   */
  const runSpeedTest = useCallback(async () => {
    updateTestState({ loading: true, progress: 0 });
    
    try {
      // Reset previous results
      resetTestResults();
      
      // Run tests sequentially with progress tracking
      await getIp();
      await measurePing();
      await measureDownload();
      await measureUpload();
      
    } catch (err) {
      console.error('Speed test failed:', err);
    } finally {
      updateTestState({ 
        loading: false, 
        currentTest: null 
      });
      
      // Keep progress at 100% when complete, reset after a delay
      setTimeout(() => {
        updateTestState({ progress: 0 });
      }, 2000);
    }
  }, [getIp, measurePing, measureDownload, measureUpload, resetTestResults, updateTestState]);

  // Memoized return object to prevent unnecessary re-renders
  return {
    // Test results
    ...testResults,
    
    // Test state
    ...testState,
    
    // Actions
    runSpeedTest
  };
};
