const express = require("express");
const routes = express.Router();

const { auth } = require("../../middleware/auth");

const {
  getUserChat,
  getChatMessages,
  insertMessage,
} = require("../../model/Message1");

// @route   GET /api/v1/chat/?offset=0&limit=5
// @desc    Get a limited number of user chats
// @access  Privat
routes.get("/", auth, async (req, res) => {
  const { offset, limit } = req.query;
  const user_id = req.body.user_id.id;

  if ((!parseInt(offset) && parseInt(offset) !== 0) || !parseInt(limit)) {
    return res.status(400).json({ message: "Bad query params" });
  }
  try {
    // search for existing user
    const chats = await getUserChat(user_id, offset, limit);
    res.status(200).json({ chats });
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
});

// @route   GET /api/v1/chat/:chat_id
// @desc    Get chat's messages
// @access  Privat
routes.get("/:chat_id", auth, async (req, res) => {
  const { chat_id } = req.params;
  const { offset, limit } = req.query;

  if (!parseInt(chat_id))
    return res.status(400).json({ message: "Bad chat ID" });
  if ((!parseInt(offset) && parseInt(offset) !== 0) || !parseInt(limit)) {
    return res.status(400).json({ message: "Bad query params" });
  }
  try {
    const messages = await getChatMessages(chat_id, offset, limit);
    res.status(200).json({ messages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   POST /api/v1/chat/message
// @desc    Post a message
// @access  Privat
routes.post("/message", auth, async (req, res) => {
  try {
    const { user_id, chat_id, body } = req.body;
    await insertMessage(body, user_id.id, chat_id);
    req.io.sockets.emit("message", { chat_id, user_id: user_id.id, body });
    res.status(200).json({ message: "sucess" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @route   POST /api/v1/chat/serach
// @desc    search for users
// @access  privat
routes.post("/search", auth, async (req, res) => {
  const { search } = req.body;
  try {
    console.log("search for users");
    const users = await getUser(search);
    if (users.length !== 0) return res.status(200).json({ users });
    res.status(200).json({ users: [{ name: "no resualt" }] });
  } catch (error) {
    res.status(500).json({ message: "Error finding Users" });
    console.log(error);
  }
});

module.exports = routes;
