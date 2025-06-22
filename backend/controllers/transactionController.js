import Transaction from "../models/Transaction.js";
import transactionPool from "../utils/transactionPool.js";

export const createTransaction = async (req, res) => {
  const { recipient, amount } = req.body;
  try {
    const tx = new Transaction({ sender: req.user.id, recipient, amount });
    transactionPool.addTransaction(tx);
    res.status(201).json({ message: "Transaktion lagd i poolen" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const listTransactions = async (req, res) => {
  const transactions = await Transaction.find({ sender: req.user.id });
  res.status(200).json(transactions);
};