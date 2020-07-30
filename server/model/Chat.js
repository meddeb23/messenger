const { Schema, model } = require("mongoose");

// Create Schema
const ChatSchema = new Schema({
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

const Chat = model("chat", ChatSchema);

module.exports = Chat;
