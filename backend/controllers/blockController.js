import { mineBlock } from '../blockchain/blockchain.js';
import Transaction from '../models/transactionModel.js';

let transactionPool = [];

export async function addToPool(req, res) {
  transactionPool.push(req.body); // validera
  res.status(201).json({ message: 'Transaktion lagd i poolen' });
}

export async function mine(req, res) {
  const transactions = [...transactionPool];
  transactionPool = []; // töm
  const newBlock = await mineBlock(transactions, req.user.id);
  res.status(201).json({ newBlock });
}