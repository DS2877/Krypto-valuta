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

import { initP2PServer, connectToPeer } from './p2p.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/blocks', blockRoutes);

// testroute
app.get('/api/protected', protect, (req, res) => {
  res.json({ message: 'Skyddad route', user: req.user });
});

// Server, DB, P2P
const PORT = process.env.PORT || 5000;
const P2P_PORT = process.env.P2P_PORT || 6000;

connectDB(process.env.MONGO_URI)
  .then(async () => {
    await createGenesisBlock();
    app.listen(PORT, () => {
      console.log(`🚀 API-server körs på http://localhost:${PORT}`);
    });

    //WebSocket-server
    initP2PServer(P2P_PORT);
    console.log(`🌐 WebSocket-nätverk igång på ws://localhost:${P2P_PORT}`);

    // Andra noder från .env
    const peers = process.env.PEERS?.split(',') || [];
    peers.forEach(connectToPeer);
  })
  .catch((err) => {
    console.error('❌ Misslyckades att ansluta till databasen:', err);
  });
