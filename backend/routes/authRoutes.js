import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Registrering av användare
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Kontrollera om användaren redan finns
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'Användare finns redan' });
  }

  // Skapa ny användare
  const user = new User({ email, password });
  await user.save();

  // Skapa JWT-token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(201).json({ message: 'Användare skapad', token });
});

// Inloggning
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Hitta användaren
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Ogiltig e-post eller lösenord' });
  }

  // Jämför lösenord
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Ogiltig e-post eller lösenord' });
  }

  // Skapa JWT-token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: 'Inloggad', token });
});

export default router;