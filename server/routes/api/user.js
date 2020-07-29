const express = require("express");
const routes = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../model/User");

const JWT_SECRET = process.env.JWT_SECRET;

// @route   GET /api/v1/user/login
// @desc    login user
// @access  public
routes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ messege: "All fields required" });
  try {
    // search for existing user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ messege: "User dose not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {});
    if (!token) throw Error("Couldnt sign the token");

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({
        email: user.email,
        name: user.name,
      });
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
});

// @route   GET /api/v1/user/register
// @desc    login user
// @access  public
routes.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ messege: "All fields required" });

  try {
    // search for existing user
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ messege: "Email already used" });

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error("Something went wrong hashing the password");

    const newUser = new User({
      name,
      email,
      password: hash,
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error("Something went wrong saving the user");

    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {});
    if (!token) throw Error("Couldnt sign the token");

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({
        email: user.email,
        name: user.name,
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @route   GET /api/v1/user/logout
// @desc    login user
// @access  public
routes.get("/logout", (req, res) => {
  res.send("logout user");
});

module.exports = routes;
