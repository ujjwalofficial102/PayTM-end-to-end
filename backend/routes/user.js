const express = require("express");
const { createUser, checkUser } = require("./types");
const { User } = require("../db");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

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

module.exports = router;
