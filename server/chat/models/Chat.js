const { Schema, model } = require("mongoose");

// Create Schema
const ChatSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref:"user",
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref:"user",
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
  deleted: {
    type: Boolean,
    default: false
  }
});

const Chat = model("chat", ChatSchema);

module.exports = Chat;
