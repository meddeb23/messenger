const express = require("express");
const routes = express.Router();

const { auth } = require("../../../middleware/auth");

const Chat = require("../../models/Chat");
const Message = require("../../models/Message");
const User = require("../../../user/models/User");
const Device = require("../../../user/models/Devices");

const checkPaginationQuery = (limit, offset) => {
  return !parseInt(limit) || parseInt(limit) === 0 || parseInt(offset) == NaN;
};

const getUser = async (query) => {
  return await User.findById(query).select("name profile_img email login");
};

// // @route   GET /api/v1/chat/?offset=0&limit=5
// // @desc    Get a limited number of user chats
// // @access  Privat
routes.get("/", auth, async (req, res, next) => {
  const { offset, limit } = req.query;
  const { user } = req.body;
  if (checkPaginationQuery(limit, offset, res))
    return res.status(400).json({ message: "Bad query params" });

  try {
    // search for existing user
    let chats = await Chat.find({
      $or: [{ receiver: user._id }, { sender: user._id }],
    })
      .sort({ updated_at: -1 })
      .select("-deleted");
    let resualt = [];
    for (let chat of chats) {
      let item = { ...chat._doc };
      if (String(chat.sender) === String(user._id))
        item.receiver = await getUser(chat.receiver);
      else item.receiver = await getUser(chat.sender);

      item.lastMsg = await Message.findOne({ chat: item._id }).sort({
        send_Date: -1,
      });
      delete item.sender;
      resualt.push(item);
    }

    res.status(200).json([...resualt]);
  } catch (error) {
    console.log(error);
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
    // Update the message status to the sender user
    const senderDevices = await Device.find({ user: user._id });
    if (senderDevices.length !== 0) {
      senderDevices.forEach((device) => {
        req.io
          .to(device.io_id)
          .emit("msg_status_updated", { msg: savedMessage });
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
  let { offset, limit } = req.query;
  limit = parseInt(limit);
  offset = parseInt(offset);
  if (checkPaginationQuery(limit, offset)) {
    return res.status(400).json({ message: "Bad query params" });
  }
  try {
    let chat = await Chat.findById(_id);
    if (!chat) return res.status(404).json({ message: "no chats" });
    // Set the Receiver
    if (String(chat.sender) === String(user._id)) {
      chat.receiver = await User.findById(chat.receiver);
    } else {
      chat.receiver = await User.findById(chat.sender);
    }
    // Get the chat messages
    let messages = await Message.find({ chat: chat._doc._id });
    // .sort({ send_Date: -1 })
    // .limit(limit)
    // .skip(offset);

    let resualt = {
      ...chat._doc,
      messages: messages,
    };
    delete resualt.sender;
    return res.status(200).json(resualt);
  } catch (error) {
    res.status(500).json({ message: "Error finding Users" });
    console.log(error);
  }
});

module.exports = routes;
