/**
 * Format speed value with automatic unit conversion
 * @param {number} value - Speed value in Mbps
 * @returns {Object} Formatted speed object
 */
export const formatSpeed = (value) => {
  const numValue = parseFloat(value);
  
  if (isNaN(numValue) || numValue === 0) {
    return {
      displayValue: '--',
      displayUnit: 'Mbps',
      mbps: '0'
    };
  }
  
  // For speeds >= 1000 Mbps, convert to Gbps and show as GB/s
  if (numValue >= 1000) {
    const gbps = (numValue / 1000).toFixed(2);
    return {
      displayValue: gbps,
      displayUnit: 'GB/s',
      mbps: numValue.toFixed(0)
    };
  }
  
  // For speeds < 1000 Mbps, show as MB/s
  const mbs = (numValue / 8).toFixed(2); // Convert Mbps to MB/s
  return {
    displayValue: mbs,
    displayUnit: 'MB/s',
    mbps: numValue.toFixed(0)
  };
};

/**
 * Animate value from start to end with callback
 * @param {number} start - Starting value
 * @param {number} end - End value
 * @param {number} duration - Animation duration in ms
 * @param {Function} callback - Callback function with current value
 */
export const animateValue = (start, end, duration, callback) => {
  const startTime = performance.now();
  
  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const currentValue = start + (end - start) * easeOutQuart;
    
    callback(currentValue);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  
  requestAnimationFrame(animate);
};
