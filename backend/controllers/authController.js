import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ message: "Användarnamn upptaget" });

    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: "Registrerad" });
  } catch (error) {
    res.status(500).json({ message: "Serverfel", error: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Felaktiga inloggningsuppgifter" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Serverfel", error: error.message });
  }
};