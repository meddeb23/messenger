const express = require("express");
const debug = require("debug")("app:startup");
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

const server = require("http").Server(app);
const io = require("socket.io")(server);

require("./start/setupSocket")(io);
require("./start/routes")(app, io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  debug(`Server is running in ${process.env.NODE_ENV} on Port ${PORT}`)
);
