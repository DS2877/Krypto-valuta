import Block from '../models/Block.js';

let difficulty = 4;

export const calculateHash = (block) => {
  const { index, timestamp, transactions, previousHash, nonce } = block;
  return `${index}${timestamp}${JSON.stringify(transactions)}${previousHash}${nonce}`;
};

export const createGenesisBlock = async () => {
  const existing = await Block.countDocuments();
  if (existing === 0) {
    const genesisBlock = new Block({
      index: 0,
      timestamp: Date.now(),
      transactions: [],
      previousHash: '0',
      hash: 'GENESIS_HASH',
      nonce: 0,
    });
    await genesisBlock.save();
    console.log('🌱 Genesis block skapat');
  }
};

export const mineBlock = async (transactions) => {
  const lastBlock = await Block.findOne().sort({ index: -1 });
  const index = lastBlock.index + 1;
  const previousHash = lastBlock.hash;
  const timestamp = Date.now();
  let nonce = 0;
  let hash = '';

  while (!hash.startsWith('0'.repeat(difficulty))) {
    nonce++;
    hash = calculateHash({ index, timestamp, transactions, previousHash, nonce });
  }

  const newBlock = new Block({
    index,
    timestamp,
    transactions,
    previousHash,
    hash,
    nonce,
  });

  await newBlock.save();
  return newBlock;
};