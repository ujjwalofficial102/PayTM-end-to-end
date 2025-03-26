const express = require("express");
const { createUser, checkUser, updateUser } = require("./types");
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware");
const mongoose = require("mongoose");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createUser.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "Incorrect Inputs",
    });
    return;
  }

  //check if user already exist
  const userExist = await User.findOne({
    username: createPayload.username,
  });
  if (userExist) {
    res.status(411).json({
      msg: "Email already taken",
    });
    return;
  }

  //databse entry
  const dbUser = await User.create(createPayload);

  const userId = dbUser._id;
  await Account.create({
    userId,
    balance: Math.floor(1 + Math.random() * 10000),
  });

  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    JWT_SECRET
  );
  res.json({
    msg: "User Created Successfully",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = checkUser.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "Invalid Email or Password",
    });
    return;
  }
  //find username in database
  const userExist = await User.findOne({
    username: createPayload.username,
  });
  if (!userExist) {
    res.status(411).json({
      msg: "Email does Not Exist",
    });
    return;
  }
  //check valid password
  if (createPayload.password !== userExist.password) {
    res.status(411).json({
      msg: "Incorrect Password",
    });
    return;
  }

  const token = jwt.sign(
    {
      userId: userExist._id,
    },
    JWT_SECRET
  );
  res.json({
    message: `${createPayload.username} signed in`,
    token: token,
  });
});

router.put("/update", authMiddleware, async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = updateUser.safeParse(createPayload);
  if (!parsedPayload.success) {
    return res.status(403).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, { $set: parsedPayload.data });
  res.json({
    message: "Updated Successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});
router.get("/self", async (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }
  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid MongoDB ObjectId" });
  }

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  });
});

module.exports = router;
