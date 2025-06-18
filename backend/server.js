import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js'; // DB-anslutning
import authRoutes from './routes/authRoutes.js'; // Auth
import transactionRoutes from './routes/transactionRoutes.js'; // Transaktioner
import blockRoutes from './routes/blockRoutes.js'; // Block
import { protect } from './middleware/authMiddleware.js'; // Middleware
import { createGenesisBlock } from './blockchain/blockchain.js'; // Genesis block

createGenesisBlock();

app.use('/api/transactions', transactionRoutes);
app.use('/api/blocks', blockRoutes);

// Ladda miljövariabler
dotenv.config();

// Skapa express-app
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
    await createGenesisBlock(); // Säkerställ att första blocket finns
    app.listen(PORT, () => {
      console.log(`🚀 Server körs på http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Misslyckades att ansluta till databasen:', err);
  });