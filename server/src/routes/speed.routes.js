import { Router } from 'express';
import { getSpeedTest, createSpeedTest } from '../controllers/speed.controller.js';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Speed test endpoints
router.get('/speedtest', getSpeedTest);
router.post('/speedtest', createSpeedTest);

export default router;
