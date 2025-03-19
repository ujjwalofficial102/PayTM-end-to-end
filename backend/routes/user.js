const express = require("express");
const { createUser, checkUser, updateUser } = require("./types");
const { User } = require("../db");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware");

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
  }

  const token = jwt.sign(
    {
      userId: userExist._id,
    },
    JWT_SECRET
  );
  res.json({
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

module.exports = router;
