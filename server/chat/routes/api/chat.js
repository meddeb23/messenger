const express = require("express");
const routes = express.Router();

const { auth } = require("../../../middleware/auth");

const Chat = require("../../models/Chat");
const Message = require("../../models/Message");
const User = require("../../../user/models/User");
const Device = require("../../../user/models/Devices");

const { normaliseChats } = require("../../utilities/validation");
const chatList = require("../../utilities/chatUtilities");

// // @route   GET /api/v1/chat/?page=0
// // @desc    Get a limited number of user chats
// // @access  Privat
routes.get("/", auth, async (req, res) => {
  const { page } = req.query;
  const { user } = req.body;
  // search for existing user
  let chats = await chatList.getChatPages(
    { $or: [{ receiver: user._id }, { sender: user._id }] },
    page || 0
  );
  for (let chat of chats) {
    chat = normaliseChats(chat, user._id);
    chat.lastMsg = await Message.findOne({ chat: chat._id }).sort({
      send_Date: -1,
    });

    delete chat.sender;
  }
  res.status(200).json(chats);
});

// // @route   POST /api/v1/chat/message
// // @desc    Post a message
// // @access  Privat
routes.post("/message", auth, async (req, res) => {
  const { user, chat_id, body } = req.body;
  const chat = await Chat.findById(chat_id);
  if (!chat) throw new Error("chat dose not exist");
  const receiver_id =
    String(chat.sender) === String(user._id) ? chat.receiver : chat.sender;
  const receiver = await User.findById(receiver_id);
  const newMsg = new Message({
    body,
    chat: chat_id,
    sender: user._id,
    send_Date: Date.now(),
  });
  const savedMessage = await newMsg.save();
  chat.updated_at = Date.now();
  await chat.save();
  // Update the message status to the sender user
  const senderDevices = await Device.find({ user: user._id });
  if (senderDevices.length !== 0) {
    senderDevices.forEach((device) => {
      req.io.to(device.io_id).emit("msg_status_updated", { msg: savedMessage });
    });
  }
  // send message to the receiver
  const receiverDevices = await Device.find({ user: receiver._id });
  if (receiverDevices.length !== 0) {
    receiverDevices.forEach((device) => {
      req.io.to(device.io_id).emit("receive_message", savedMessage);
    });
  }
  res.status(203);
});

// @route   GET /api/v1/chat
// @desc    search for chat by user
// @access  privat
routes.get("/receiver/:_id", auth, async (req, res) => {
  const { _id } = req.params;
  const { user } = req.body;
  let chat = await Chat.findOne({ receiver: _id, sender: user._id });
  chat = !chat ? await Chat.findOne({ sender: _id, receiver: user._id }) : chat;

  if (!chat) {
    const newChat = new Chat({
      sender: user._id,
      receiver: _id,
    });
    chat = await newChat.save();
  }

  chat.receiver = await User.findById(_id);

  let resualt = {
    ...chat._doc,
    messages: await Message.find({ chat: chat._doc._id }),
  };
  delete resualt.sender;
  return res.status(200).json(resualt);
});

// @route   GET /api/v1/chat
// @desc    search for chat by _id
// @access  privat
routes.get("/:_id", auth, async (req, res) => {
  const { _id } = req.params;
  let { page } = req.query;
  const { user } = req.body;
  let chat = normaliseChats(await chatList.getChatById(_id), user._id);
  if (!chat) return res.status(404).json({ message: "no chats" });
  let messages = await chatList.getMsgPages({ chat: chat._id }, page || 0);

  return res.status(200).json({
    ...chat,
    messages: messages,
  });
});

module.exports = routes;
