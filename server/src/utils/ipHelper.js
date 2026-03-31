/**
 * Get client IP address from request
 * Handles both IPv4 and IPv6, including forwarded headers
 */
const getClientIP = (req) => {
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  // Handle IPv6-mapped IPv4 addresses
  if (ip && ip.includes("::ffff:")) {
    ip = ip.split("::ffff:")[1];
  }

  // Handle x-forwarded-for with multiple IPs
  if (ip && ip.includes(',')) {
    ip = ip.split(',')[0].trim();
  }

  // Remove ::1 (localhost IPv6)
  if (ip === '::1') {
    ip = '127.0.0.1';
  }

  return ip;
};

export default getClientIP;
