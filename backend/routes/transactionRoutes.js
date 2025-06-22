import express from "express";
import { createTransaction, listTransactions } from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTransaction);
router.get("/", protect, listTransactions);

export default router;