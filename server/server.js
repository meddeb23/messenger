const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

// Set env variable
require("dotenv").config({
  path: path.join(process.cwd(), "/config/.env"),
});

// Connect to a data base
// const db = mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log(`database connected`))
//   .catch((err) => console.error(err));

// MIDDLEWARES

//   Basic security
app.use(helmet());

// cors middleware
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// cookie parser middleware
app.use(cookieParser());
// Morgan
app.use(morgan("common"));

// Assign socket object to every request
app.use(function (req, res, next) {
  req.io = io;
  next();
});

const server = require("http").Server(app);

const io = require("socket.io")(server);
const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`Server is running in ${process.env.NODE_ENV} on Port ${PORT}`)
);

// Routes
app.use("/api/v1/user", require("./routes/api/user"));
app.use("/api/v1/chat", require("./routes/api/chat"));
