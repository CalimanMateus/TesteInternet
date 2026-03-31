/**
 * Convert MB/s to Mbps
 * 1 MB/s = 8 Mbps
 */
export const convertMBpsToMbps = (mbps) => {
  const mbpsValue = parseFloat(mbps);
  if (isNaN(mbpsValue)) return '0';
  return (mbpsValue * 8).toFixed(0);
};

/**
 * Format speed display with both MB/s and Mbps
 */
export const formatSpeed = (mbps) => {
  const mbpsValue = parseFloat(mbps);
  if (isNaN(mbpsValue)) return { mbps: '0', mbpsDisplay: '0' };
  
  const mbpsDisplay = mbpsValue.toFixed(2);
  const mbpsConverted = convertMBpsToMbps(mbpsValue);
  
  return {
    mbps: mbpsDisplay,
    mbpsDisplay: mbpsConverted
  };
};

/**
 * Animate number from 0 to target value
 */
export const animateValue = (start, end, duration, callback) => {
  const startTime = performance.now();
  const difference = end - start;
  
  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const currentValue = start + (difference * easeOutQuart);
    
    callback(currentValue);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  
  requestAnimationFrame(animate);
};
