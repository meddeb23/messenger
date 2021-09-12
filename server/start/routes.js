const express = require("express");
const path = require("path");

const helmet = require("helmet");
const cors = require("cors");
const fileUploader = require("express-fileupload");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("../middleware/errorHandler");

const user = require("../user/routes/api/user");
const chat = require("../chat/routes/api/chat");

module.exports = (app) => {
  // MIDDLEWARES
  // app.use(helmet()); // Basic security
  app.use(cors()); // cors middleware
  app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
  app.use(express.json()); // parse application/json
  app.use(cookieParser()); // cookie parser middleware
  app.use(fileUploader()); // File uploader middleware
  app.use(errorHandler); // Error handling Middleware

  app.use("/", express.static(path.join(__dirname, "..", "public")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "..", "client", "build", "index.html")
    );
  });
  // Routes
  app.use("/api/v1/user", user);
  app.use("/api/v1/chat", chat);
};
