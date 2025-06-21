import express from 'express';
import Block from '../models/Block.js';
import { getTransactionPool, clearTransactionPool } from '../blockchain/transactionPool.js';
import { mineBlock } from '../blockchain/blockchain.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Hämta alla block
router.get('/', async (req, res) => {
  try {
    const blocks = await Block.find().sort({ index: 1 });
    res.json(blocks);
  } catch (err) {
    res.status(500).json({ message: 'Fel vid hämtning av block' });
  }
});

// POST /api/blocks/mine
router.post('/mine', protect, async (req, res) => {
  try {
    const transactions = getTransactionPool();

    if (transactions.length === 0) {
      return res.status(400).json({ message: 'Inga transaktioner att mine:a' });
    }

    const block = await mineBlock(transactions);
    clearTransactionPool();
    res.status(201).json({ message: 'Block mine:at', block });
  } catch (err) {
    res.status(500).json({ message: 'Fel vid mining', error: err.message });
  }
});

export default router;