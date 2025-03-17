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

module.exports = {
  createUser,
  checkUser,
};
