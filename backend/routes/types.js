const zod = require("zod");

const createUser = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string().min(6),
});

const checkUser = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
});

const updateUser = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().min(6).optional(),
});

module.exports = {
  createUser,
  checkUser,
  updateUser,
};
