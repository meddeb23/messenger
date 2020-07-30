const { Schema, model } = require("mongoose");

// Create Schema
const ConvoSchema = new Schema({
  user1: {
    type: String,
    required: true,
  },
  user2: {
    type: String,
    required: true,
  },
  messages: [String],
});

const User = model("user", UserSchema);

module.exports = User;
