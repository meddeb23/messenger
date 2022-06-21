// socket api function
const { socketAuth, disconnectUser } = require("../middleware/auth");
const { updateMsgStatus } = require("../chat/socket_api");

module.exports = (io) => {
  io.on("connect", (socket) => {
    // console.log(socket.handshake.query);
    socketAuth(socket.id, socket.handshake.query.id);
    socket.on("update_msg_status", ({ messages, status }) => {
      updateMsgStatus(io, messages, status);
    });
    socket.on("disconnect", () => {
      disconnectUser(socket.id);
    });
  });
};
