import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  fromAddress: String,
  toAddress: String,
  amount: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Transaction', transactionSchema);