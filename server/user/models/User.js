const { Schema, model } = require("mongoose");

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  profile_img: {
    type: String,
    default: "/profile_images/default.jpg",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
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
});

const User = model("user", UserSchema);

module.exports = User;
