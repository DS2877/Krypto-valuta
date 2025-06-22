import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import blockRoutes from './routes/blockRoutes.js';
import { protect } from './middleware/authMiddleware.js';
import { createGenesisBlock } from './blockchain/blockchain.js';

dotenv.config();

// express-app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/blocks', blockRoutes);

// Test: Skyddad route
app.get('/api/protected', protect, (req, res) => {
  res.json({ message: 'Skyddad route', user: req.user });
});

// Starta server + anslut till DB
const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI)
  .then(async () => {
    await createGenesisBlock();
    app.listen(PORT, () => {
      console.log(`🚀 Server körs på http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Misslyckades att ansluta till databasen:', err);
  });