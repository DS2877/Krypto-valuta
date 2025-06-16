import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const router = express.Router();

// Registrera en ny användare
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Kontrollera om användaren redan finns
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Användaren finns redan!' });
    }

    // Skapa ny användare
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Skapa JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ message: 'Användare skapad', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Serverfel' });
  }
});

// Logga in användare
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Hitta användaren
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Fel användarnamn eller lösenord' });
    }

    // Kontrollera om lösenordet är rätt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Fel användarnamn eller lösenord' });
    }

    // Skapa JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ message: 'Inloggning lyckades', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Serverfel' });
  }
});

export default router;