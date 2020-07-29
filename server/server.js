const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

require("dotenv").config({
  path: path.join(process.cwd(), "/config/.env"),
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// cookie parser middleware
app.use(cookieParser());
// Morgan
app.use(morgan("common"));

// Connect to a data base
const db = mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`database connected`))
  .catch((err) => console.error(err));

app.use(helmet());
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// cookie parser middleware
app.use(cookieParser());
// Morgan
app.use(morgan("common"));

app.use("/api/v1/user", require("./routes/api/user"));

// const server = require("http").Server(app);
// const io = require("socket.io")(server);
// app.get("/:room", (req, res) => {
//   res.render("room", { roomId: req.params.room });
// });
// io.on("connection", (socket) => {
//   console.log("user Connecting");
//   socket.on("join-room", (roomId) => {
//     const userId = uuidV4();
//     socket.join(roomId);
//     socket.emit("get-info", userId);
//     socket.to(roomId).broadcast.emit("user-connected", userId);
//   });
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server is running in ${process.env.NODE_ENV} on Port ${PORT}`)
);
