import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'; // Importera din db-anslutning
import authRoutes from './routes/authRoutes.js'; // Importera auth-routes
import { protect } from './middleware/authMiddleware.js'; // Importera middleware för skyddade routes

// Ladda miljövariabler
dotenv.config();

const app = express();

// Middleware för CORS och JSON
app.use(cors());
app.use(express.json());

// Anslut till databasen
connectDB(process.env.MONGO_URI);  // Använd rätt MongoDB URI från .env

// Auth-routes för registrering och inloggning
app.use('/api/auth', authRoutes);

// Skyddad route som exempel
app.get('/api/protected', protect, (req, res) => {
  res.json({ message: 'Skyddad route', user: req.user });
});

// Starta servern
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server körs på http://localhost:${PORT}`);
});