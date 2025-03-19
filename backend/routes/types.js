const zod = require("zod");

const createUser = zod.object({
  username: zod.string().email(),
  firstname: zod.string(),
  lastname: zod.string(),
  password: zod.string().min(6),
});

const checkUser = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
});

const updateUser = zod.object({
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
  password: zod.string().min(6).optional(),
});

module.exports = {
  createUser,
  checkUser,
  updateUser,
};
