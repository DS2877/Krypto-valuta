import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const protect = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Inte autentiserad' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Lägg till användaren i request-objektet
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Ogiltig eller utgången token' });
  }
};

export { protect };