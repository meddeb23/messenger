const express = require("express");
const path = require("path");
const morgan = require("morgan");

const helmet = require("helmet");
const cors = require("cors");
const fileUploader = require("express-fileupload");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("../middleware/errorHandler");

const user = require("../user/routes/api/user");
const chat = require("../chat/routes/api/chat");

module.exports = (app, io) => {
  // MIDDLEWARES
  // app.use(helmet()); // Basic security
  app.use(cors()); // cors middleware
  app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
  app.use(express.json()); // parse application/json
  app.use(cookieParser()); // cookie parser middleware
  app.use(fileUploader()); // File uploader middleware
  app.use(morgan("dev")); // Morgan
  // Assign socket object to every request
  app.use((req, res, next) => {
    req.io = io;
    next();
  });
  app.use("/public", express.static(path.join(__dirname, "..", "public")));
  if (process.env.NODE_ENV !== "developement")
    app.use(
      "/",
      express.static(path.join(__dirname, "..", "..", "client", "build"))
    );

  // Routes
  app.use("/api/v1/user", user);
  app.use("/api/v1/chat", chat);
  app.get("/err", (req, res) => {
    throw new Error("break");
  });

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "..", "client", "build", "index.html")
    );
  });
  app.use(errorHandler); // Error handling Middleware
};
