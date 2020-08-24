const { Schema, model } = require("mongoose");

// Create Schema
const ChatSchema = new Schema({
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  create_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

const Chat = model("chat", ChatSchema);

module.exports = Chat;
