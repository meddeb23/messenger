const express = require("express");
const debug = require("debug")("app");

const path = require("path");

const app = express();

// Set env variable
require("dotenv").config({
  path: path.join(process.cwd(), "/config/.env"),
});
// Mongosse database
require("./database/db");

const Device = require("./user/models/Devices");
Device.deleteMany({})
  .then((_) => {
    debug("Cleaning existing Conection ...");
  })
  .catch((err) => console.log(err));

// socket api function
const { socketAuth, disconnectUser } = require("./middleware/auth");
const { updateMsgStatus } = require("./chat/socket_api");

const dev = process.env.NODE_ENV === "developement";

const morgan = require("morgan");
app.use(morgan("dev")); // Morgan

const server = require("http").Server(app);
const io = require("socket.io")(server);
io.on("connect", (socket) => {
  // console.log(socket.handshake.query);
  socketAuth(socket.id, socket.handshake.query.id);
  socket.on("update_msg_status", ({ msg, status }) => {
    updateMsgStatus(io, msg, status);
  });
  socket.on("disconnect", () => {
    disconnectUser(socket.id);
  });
});

// Assign socket object to every request
app.use(function (req, res, next) {
  req.io = io;
  next();
});

require("./start/routes")(app);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  debug(`Server is running in ${process.env.NODE_ENV} on Port ${PORT}`)
);
