const { Schema, model } = require("mongoose");

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  login: {
    type: Boolean,
    default: false,
  },
  io_id: {
    type: String,
    default: "",
  },
});

const User = model("user", UserSchema);

module.exports = User;
