const express = require("express");
const routes = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { auth } = require("../../../middleware/auth");
const User = require("../../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

// @route   POST /api/v1/user/login
// @desc    login user
// @access  Public
routes.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields required" });
  try {
    // search for existing user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User dose not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {});
    if (!token) throw Error("Couldnt sign the token");

    user.login = true;
    await user.save();

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
        },
      });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/v1/user/register
// @desc    register user
// @access  public
routes.post("/register", async (req, res, next) => {
  const { name, email, password, cPassword } = req.body;
  if (!name || !cPassword || !email || !password)
    return res.status(400).json({ message: "All fields required" });
  if (password !== cPassword)
    return res.status(400).json({ message: "Passwords don't matchs" });
  try {
    // search for existing user
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already used" });

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error("Something went wrong hashing the password");

    const newUser = new User({
      name,
      password: hash,
      email,
      login: true,
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error("Something went wrong saving the user");

    const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET, {});
    if (!token) throw Error("Couldnt sign the token");

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({
        user: {
          _id: savedUser._id,
          email: savedUser.email,
          name: savedUser.name,
        },
      });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/v1/user/logout
// @desc    login user
// @access  public
routes.get("/logout", auth, (req, res) => {
  User.findByIdAndUpdate(req.body.user._id, { login: false });
  res.clearCookie("token");
  res.status(200).send("logout user");
});

// @route   GET /api/v1/user
// @desc    user info
// @access  privat
routes.get("/", auth, async (req, res) => {
  try {
    const { user } = req.body;
    res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error finding User info" });
  }
});

// @route   POST /api/v1/user/serach
// @desc    search for users
// @access  privat
routes.post("/search", auth, async (req, res) => {
  const { search } = req.body;
  try {
    const find_users = await User.find({ name: search });
    if (find_users.length !== 0) {
      const users = [];
      for (const user of find_users) {
        users.push({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      }
      return res.status(200).json({ users });
    }
    res.status(200).json({ users: [{ name: "no resualt" }] });
  } catch (error) {
    res.status(500).json({ message: "Error finding Users" });
    console.log(error);
  }
});

// @route   GET /api/v1/user/:search_id
// @desc    search for user by id
// @access  privat
routes.get("/:search_id", auth, async (req, res) => {
  const { search_id } = req.params;
  try {
    const user = await User.findById(search_id);
    if (!user) return res.status(404).json({ message: "user dont exist" });
    res.status(200).json({
      id: user._id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    throw error;
  }
});

module.exports = routes;
