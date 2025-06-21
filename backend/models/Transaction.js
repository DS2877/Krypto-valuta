import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true },
    recipient: { type: String, required: true },
    amount: { type: Number, required: true, min: 0.00000001 },
    timestamp: { type: Date, default: Date.now },
    isConfirmed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Transaction', transactionSchema);