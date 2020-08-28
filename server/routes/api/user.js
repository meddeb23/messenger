const express = require("express");
const routes = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { auth } = require("../../middleware/auth");
const {
  getUserByEmail,
  getUserById,
  insertUser,
  getUser,
} = require("../../model/User1");

const JWT_SECRET = process.env.JWT_SECRET;

// @route   GET /api/v1/user/login
// @desc    login user
// @access  Public
routes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields required" });
  try {
    // search for existing user
    const user = await getUserByEmail(email);
    if (!user) return res.status(400).json({ message: "User dose not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {});
    if (!token) throw Error("Couldnt sign the token");

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
        },
      });
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
});

// @route   GET /api/v1/user/register
// @desc    register user
// @access  public
routes.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  try {
    // search for existing user
    const user = await getUserByEmail(email);
    if (user) return res.status(400).json({ message: "Email already used" });

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error("Something went wrong hashing the password");

    await insertUser(first_name, last_name, email, hash);

    const savedUser = await getUserByEmail(email);
    if (!savedUser) throw Error("Something went wrong saving the user");

    const token = jwt.sign({ id: savedUser.id }, JWT_SECRET, {});
    if (!token) throw Error("Couldnt sign the token");

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({
        user: {
          id: savedUser.id,
          email: savedUser.email,
          first_name: savedUser.first_name,
          last_name: savedUser.last_name,
        },
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

// @route   GET /api/v1/user
// @desc    user info
// @access  privat
routes.get("/", auth, async (req, res) => {
  try {
    const user = await getUserById(req.body.user_id.id);
    if (!user) return res.status(400).json({ message: "Bad Request" });
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
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
    const users = await getUser(search);
    if (users.length !== 0) return res.status(200).json({ users });
    res.status(200).json({ users: [{ name: "no resualt" }] });
  } catch (error) {
    res.status(500).json({ message: "Error finding Users" });
    console.log(error);
  }
});

// @route   POST /api/v1/user/:search_id
// @desc    search for user by id
// @access  privat
routes.get("/:search_id", auth, async (req, res) => {
  const { search_id } = req.params;
  try {
    const user = await getUserById(search_id);
    if (!user) return res.status(404).json({ message: "user dont exist" });
    res.status(200).json({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    });
  } catch (error) {
    console.log("Cant search users");
    res.status(500).json({ message: "Error finding Users" });
  }
});

module.exports = routes;
