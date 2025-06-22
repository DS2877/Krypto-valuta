import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number, required: true },
    status: { type: String, default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", TransactionSchema);