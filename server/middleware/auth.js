const User = require("../user/models/User");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "CKJ$%sGKGF$KJJfHFL";

const auth = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};
const isAdmin = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};
// sokcet auth
const socketAuth = (io, socket) => {
  io.to(socket.id).emit("auth");
  socket.on("login", async (_id) => {
    let user = await User.findById(_id);
    user.login = true;
    user.io_id = socket.id;
    await user.save();
    console.log(`${user.name} is online`);
  });
};

const disconnectUser = async (id) => {
  try {
    let user = await User.findOne({ io_id: id });
    if (user) {
      user.login = false;
      user.io_id = "";
      await user.save();
      console.log(`${user.name} is offline`);
    }
    console.log(`user is offline`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { auth, isAdmin, socketAuth, disconnectUser };
