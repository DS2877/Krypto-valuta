class TransactionPool {
  constructor() {
    this.transactions = [];
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

  clear() {
    this.transactions = [];
  }

  getTransactions() {
    return this.transactions;
  }
}

export default new TransactionPool();