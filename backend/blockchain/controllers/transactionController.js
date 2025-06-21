import Transaction from '../models/Transaction.js';

export const createTransaction = async (req, res) => {
  try {
    const { recipient, amount } = req.body;
    const sender = req.user.id; // från auth-middleware

    if (!recipient || !amount) {
      return res.status(400).json({ error: 'Recipient and amount are required' });
    }

    const transaction = new Transaction({ sender, recipient, amount });
    await transaction.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lista transaktioner
export const listTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ isConfirmed: false }); // pool
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};