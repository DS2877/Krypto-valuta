import express from 'express';
import { mine } from '../controllers/blockController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/mine', protect, mine);

export default router;