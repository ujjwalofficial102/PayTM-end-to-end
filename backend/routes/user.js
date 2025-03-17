const express = require("express");
const { createUser } = require("./types");
const { User } = require("../db");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

const router = express.Router();

module.exports = router;

router.post("/signup", async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createUser.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "Incorrect Inputs",
    });
    return;
  }
  const userExist = await User.findOne({
    username: createPayload.username,
  });
  if (userExist) {
    res.status(411).json({
      msg: "Email already taken",
    });
    return;
  }
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
