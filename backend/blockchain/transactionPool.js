let transactionPool = [];

export const addTransactionToPool = (tx) => {
  transactionPool.push(tx);
};

export const getTransactionPool = () => {
  return transactionPool;
};

export const clearTransactionPool = () => {
  transactionPool = [];
};