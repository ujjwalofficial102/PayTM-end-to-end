const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://ujjwalmishra102:39sb26kdkm@cluster0.pjqkt.mongodb.net/paytmUsers"
);

const userSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  password: String,
});

const User = mongoose.model("users", userSchema);
module.exports = {
  User,
};
