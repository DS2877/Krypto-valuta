import crypto from "crypto";
import Block from "../models/Block.js";
import transactionPool from "./transactionPool.js";

export const mineBlock = async () => {
  const transactions = transactionPool.getTransactions();
  const previousBlock = await Block.findOne().sort({ createdAt: -1 });
  const previousHash = previousBlock ? previousBlock.hash : "genesis";

  const blockData = {
    index: previousBlock ? previousBlock.index + 1 : 0,
    transactions: transactions.map((tx) => tx._id),
    previousHash,
    nonce: Math.floor(Math.random() * 1000000),
  };
  const hash = crypto.createHash("sha256").update(JSON.stringify(blockData)).digest("hex");

  const newBlock = new Block({ ...blockData, hash });
  await newBlock.save();

  transactionPool.clear();
  return newBlock;
};