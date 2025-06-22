import Block from '../models/blockModel.js';
import Transaction from '../models/transactionModel.js';

export async function createGenesisBlock() {
  const existing = await Block.findOne({ index: 0 });
  if (!existing) {
    const genesis = new Block({ index: 0, hash: 'GENESIS', previousHash: null, transactions: [] });
    await genesis.save();
    console.log('✅ Genesis block created.');
  }
}

export async function mineBlock(transactions, rewardAddress) {
  const lastBlock = await Block.findOne().sort({ index: -1 });
  const newIndex = lastBlock ? lastBlock.index + 1 : 1;
  const newBlock = new Block({
    index: newIndex,
    previousHash: lastBlock ? lastBlock.hash : null,
    transactions: transactions,
    hash: 'someHash',
  });
  await newBlock.save();
  return newBlock;
}