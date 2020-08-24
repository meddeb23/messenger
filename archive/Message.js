const { Schema, model } = require("mongoose");
const User = require("./User");

// Create Schema
const MessageSchema = new Schema({
  body: {
    type: String,
    require: true,
  },
  send_Date: {
    type: Date,
    default: Date.now,
  },
  sender_id: {
    type: String,
    require: true,
  },
  seen: {
    type: Boolean,
    default: false,
  },
  chat: {
    type: String,
    required: true,
  },
});

const Message = model("Message", MessageSchema);

module.exports = Message;
