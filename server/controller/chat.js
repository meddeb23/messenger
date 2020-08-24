const Chat = require("../model/Chat");

// start a chat
const startChat = async (sender, receiver) => {
  console.log(`start chat bwn ${sender} and ${receiver}`);
  try {
    if (!sender || !receiver) return false;
  } catch (error) {}
};

// io.on("connection", (socket) => {
//   console.log("user Connecting");
//   socket.on("start_chat", ({ sender, receiver }) =>
//     startChat(sender, receiver)
//   );
//   socket.on("send_message", ({ message, chat_id }) => {
//     console.log(`new message to chat ${chat_id}\n message: ${message}`);
//   });

// socket.on("join-room", (roomId) => {
//   const userId = uuidV4();
//   socket.join(roomId);
//   socket.emit("get-info", userId);
//   socket.to(roomId).broadcast.emit("user-connected", userId);
// });
// });

module.exports = { startChat };
