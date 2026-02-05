const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshJWT: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", userModel);

module.exports = User;
