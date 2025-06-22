import mongoose from "mongoose";

const BlockSchema = new mongoose.Schema(
  {
    index: Number,
    timestamp: { type: Date, default: Date.now },
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
    previousHash: String,
    hash: String,
    nonce: Number
  },
  { timestamps: true }
);

export default mongoose.model("Block", BlockSchema);