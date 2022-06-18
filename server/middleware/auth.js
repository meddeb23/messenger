const User = require("../user/models/User");
const jwt = require("jsonwebtoken");
const Device = require("../user/models/Devices");
const debug = require("debug")("app:socket");
const JWT_SECRET = process.env.JWT_SECRET || "CKJ$%sGKGF$KJJfHFL";

const auth = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const decode = jwt.verify(token, JWT_SECRET);
    if (!decode) throw new Error("Access Deneied");
    const user = await User.findById(decode._id);
    if (!user) throw new Error("Access Deneied");
    req.body = {
      ...req.body,
      user,
    };
    next();
  } else {
    throw new Error("Access Deneied");
  }
};
const isAdmin = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const decode = jwt.verify(token, JWT_SECRET);
    if (!decode) throw new Error("Access Deneied");

    const user = await User.findById(decode._id);
    if (!user) throw new Error("Access Deneied");

    if (user.isAdmin) {
      req.body = {
        ...req.body,
        user: decode._id,
      };
      next();
    } else {
      throw new Error("Access Forbidden");
    }
  } else {
    throw new Error("Access Deneied");
  }
};
// sokcet auth
const socketAuth = async (io_id, _id) => {
  let user = await User.findById(_id);
  let connectionExist = await Device.findOne({ io_id });
  if (!connectionExist) {
    const newConnection = new Device({
      user: user._id,
      io_id: io_id,
    });
    const savedConnection = await newConnection.save();
    debug(`${user.name} is online with socket id : ${savedConnection.io_id}`);
  }
  user.login = true;
  await user.save();
};

const disconnectUser = async (id) => {
  console.log(`Disconnecting user with socket id : ${id}`);
  const deletedConnection = await Device.findOneAndDelete({ io_id: id });
  const existingConnections = await Device.find({
    user: deletedConnection.user,
  });
  if (existingConnections.length === 0) {
    let user = await User.findById(deletedConnection.user);
    if (user) {
      user.login = false;
      await user.save();
      console.log(`${user.name} is offline`);
    }
  }
};

module.exports = { auth, isAdmin, socketAuth, disconnectUser };
