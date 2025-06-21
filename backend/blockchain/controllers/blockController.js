import Block from '../models/Block.js';
import Transaction from '../models/Transaction.js';
import crypto from 'crypto';

export const mineBlock = async (req, res) => {
  try {
    // Hämta
    const transactions = await Transaction.find({ isConfirmed: false });

    //föregående block
    const lastBlock = await Block.findOne().sort({ index: -1 });

    const index = lastBlock ? lastBlock.index + 1 : 0;
    const previousHash = lastBlock ? lastBlock.hash : 'GENESIS';
    let nonce = 0;
    let hash = '';

    do {
      nonce++;
      hash = crypto
        .createHash('sha256')
        .update(index + previousHash + JSON.stringify(transactions) + nonce)
        .digest('hex');
    } while (!hash.startsWith('0000'));

    // Skapa blocket
    const newBlock = await Block.create({
      index,
      transactions: transactions.map(t => t._id),
      previousHash,
      hash,
      nonce
    });


    await Transaction.updateMany({ _id: { $in: transactions } }, { isConfirmed: true });


    const rewardTx = new Transaction({ sender: 'NETWORK', recipient: req.user.id, amount: 50 });
    await rewardTx.save();

    res.status(201).json(newBlock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listBlocks = async (req, res) => {
  try {
    const blocks = await Block.find().populate('transactions');
    res.json(blocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};