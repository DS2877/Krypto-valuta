// models/Block.js
import mongoose from 'mongoose';

const blockSchema = new mongoose.Schema(
  {
    index: { type: Number, required: true, unique: true },
    timestamp: { type: Date, default: Date.now },
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],
    previousHash: { type: String, required: true },
    hash: { type: String, required: true },
    nonce: { type: Number, default: 0 }
  }
);

export default mongoose.model('Block', blockSchema);