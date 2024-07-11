const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Nam", "Nữ", "Khác"],
    default: "Khác",
  },
  address: {
    type: String,
  },
  birthday: {
    type: Date,
    default: Date.now(),
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
