const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const fileUploader = require("express-fileupload");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

// Mongosse database
const db = require("./database/db");
const Device = require("./user/models/Devices");

Device.deleteMany({})
  .then((_) => {
    console.log("Cleaning existing Conection ...");
  })
  .catch((err) => console.log(err));

// socket api function
const { socketAuth, disconnectUser } = require("./middleware/auth");
const { updateMsgStatus } = require("./chat/socket_api");

// Set env variable
require("dotenv").config({
  path: path.join(process.cwd(), "/config/.env"),
});

const dev = process.env.NODE_ENV === "developement";
console.log(dev);
// MIDDLEWARES
app.use(helmet()); // Basic security
app.use(cors()); // cors middleware
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(cookieParser()); // cookie parser middleware
app.use(fileUploader()); // File uploader middleware
if (dev) {
  const morgan = require("morgan");
  app.use(morgan("dev")); // Morgan
}
app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Hello World 😃");
});

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

// Routes
app.use("/api/v1/user", require("./user/routes/api/user"));
app.use("/api/v1/chat", require("./chat/routes/api/chat"));

app.use(errorHandler); // Error handling Middleware

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`Server is running in ${process.env.NODE_ENV} on Port ${PORT}`)
);
