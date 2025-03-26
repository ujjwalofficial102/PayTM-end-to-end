const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const accountInfo = await Account.findOne({ userId: req.userId });
  if (!accountInfo) {
    return res.status(404).json({ error: "Account not found" });
  }
  res.json({
    userid: accountInfo.userId,
    balance: accountInfo.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  await session.startTransaction();
  const { to, amount } = req.body;

  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );
  if (amount <= 0 || isNaN(amount) || !amount) {
    await session.abortTransaction();
    session.endSession();
    return res.status(400).json({ message: "Invalid Amount" });
  }
  if (!account || amount > account.balance) {
    await session.abortTransaction();
    session.endSession();
    return res.status(400).json({ message: "insufficient balance" });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);
  if (!toAccount) {
    await session.abortTransaction();
    session.endSession();
    return res.status(400).json({ message: "Invalid account" });
  }
  //perform transfer
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } },
    { session: session }
  );
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } },
    { session: session }
  );

  await session.commitTransaction();
  session.endSession();
  res.json({ message: "Transfer Successful" });
});

module.exports = router;
