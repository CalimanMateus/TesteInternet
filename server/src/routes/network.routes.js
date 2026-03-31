import { Router } from 'express';
import { getClientIp, ping, downloadTest, uploadTest } from '../controllers/network.controller.js';

const router = Router();

// Get client IP address
router.get('/ip', getClientIp);

// Ping test
router.get('/ping', ping);

// Download test
router.get('/download', downloadTest);

// Upload test
router.post('/upload', uploadTest);

export default router;
