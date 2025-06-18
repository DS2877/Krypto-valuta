import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addTransactionToPool, getTransactionPool } from '../blockchain/transactionPool.js';

const router = express.Router();

// POST /api/transactions - lägg till i pool
router.post('/', protect, (req, res) => {
  const { fromAddress, toAddress, amount } = req.body;

  if (!fromAddress || !toAddress || !amount) {
    return res.status(400).json({ message: 'Saknar fält' });
  }

  const transaction = {
    fromAddress,
    toAddress,
    amount,
    timestamp: Date.now(),
  };

  addTransactionToPool(transaction);
  res.status(201).json({ message: 'Transaktion tillagd', transaction });
});

// GET /api/transactions/pool
router.get('/pool', protect, (req, res) => {
  res.json(getTransactionPool());
});

export default router;