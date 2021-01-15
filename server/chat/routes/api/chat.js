const express = require("express");
const routes = express.Router();

const { auth } = require("../../../middleware/auth");

const Chat = require("../../models/Chat");
const Message = require("../../models/Message");
const User = require("../../../user/models/User");

// // @route   GET /api/v1/chat/?offset=0&limit=5
// // @desc    Get a limited number of user chats
// // @access  Privat
routes.get("/", auth, async (req, res, next) => {
  const { offset, limit } = req.query;
  const { user } = req.body;

  // if ((!parseInt(offset) && parseInt(offset) !== 0) || !parseInt(limit)) {
  //   return res.status(400).json({ message: "Bad query params" });
  // }
  try {
    // search for existing user
    // TODO :: Merge to a single query
    let chats = await Chat.find({
      $or: [{ receiver: user._id }, { sender: user._id }],
    }).sort({ updated_at: -1 });
    let resualt = [];
    for (let chat of chats) {
      let item = { ...chat._doc };
      if (String(chat.sender) === String(user._id)) {
        item.receiver = await User.findById(chat.receiver);
      } else {
        item.receiver = await User.findById(chat.sender);
      }
      item.lastMsg = await Message.findOne({ chat: item._id }).sort({
        send_Date: -1,
      });
      delete item.sender;
      resualt.push(item);
    }

    res.status(200).json([...resualt]);
  } catch (error) {
    next(error);
  }
});

// // @route   POST /api/v1/chat/message
// // @desc    Post a message
// // @access  Privat
routes.post("/message", auth, async (req, res) => {
  try {
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
    req.io.to(receiver.io_id).emit("message", savedMessage);
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/v1/chat
// @desc    search for chat by user
// @access  privat
routes.get("/receiver/:_id", auth, async (req, res) => {
  const { _id } = req.params;
  const { user } = req.body;
  try {
    let chat = await Chat.findOne({ receiver: _id, sender: user._id });
    chat = !chat
      ? await Chat.findOne({ sender: _id, receiver: user._id })
      : chat;

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
  } catch (error) {
    res.status(500).json({ message: "Error finding Users" });
    console.log(error);
  }
});

// @route   GET /api/v1/chat
// @desc    search for chat by _id
// @access  privat
routes.get("/:_id", auth, async (req, res) => {
  const { _id } = req.params;
  const { user } = req.body;
  try {
    let chat = await Chat.findById(_id);
    if (!chat) return res.status(404).json({ message: "no chats" });

    if (String(chat.sender) === String(user._id)) {
      chat.receiver = await User.findById(chat.receiver);
    } else {
      chat.receiver = await User.findById(chat.sender);
    }

    let resualt = {
      ...chat._doc,
      messages: await Message.find({ chat: chat._doc._id }),
    };
    delete resualt.sender;
    return res.status(200).json(resualt);
  } catch (error) {
    res.status(500).json({ message: "Error finding Users" });
    console.log(error);
  }
});

module.exports = routes;
