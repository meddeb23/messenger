const { Schema, model } = require("mongoose");

// Create Schema
const MessageSchema = new Schema({
  body: {
    type: String,
    require: true,
  },
  send_Date: {
    type: Date,
    default: Date.now(),
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  status: {
    type: String,
    enum: ["send", "delivered", "seen"],
    default: "send",
  },
  chat: {
    type: Schema.Types.ObjectId,
    ref: "chat",
    require: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const Message = model("Message", MessageSchema);

module.exports = Message;
