const express = require("express");
const routes = express.Router();
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { auth } = require("../../../middleware/auth");
const { getUserPages } = require("../../utilities/utilities");
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
    console.log(email, password);
    // search for existing user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User dose not exist" });

    console.log("test");
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
    // console.log(req.headers["user-agent"]);
    // console.log(req.headers["sec-ch-ua"]);

    const { user } = req.body;
    res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        bio: user.bio,
        location: user.location,
        profile_img: user.profile_img,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error finding User info" });
  }
});

// @route   PUT /api/v1/user
// @desc    update user info
// @access  privat
routes.post("/upload_pic", auth, async (req, res, next) => {
  const { user } = req.body;
  try {
    // file upload handler
    if (req.files === null) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const file = req.files.file;
    const regex = /^image\/(png|jpg|jpeg)$/;
    console.log(req.files);
    if (!regex.test(file.mimetype))
      return res
        .status(400)
        .json({ message: "File type should be png, jpg, or jpeg" });
    const err = await file.mv(
      path.join(
        __dirname,
        "..",
        "..",
        "..",
        "public",
        "profile_images",
        file.name
      )
    );
    user.profile_img = `/public/profile_images/${file.name}`;
    const newUser = await user.save();
    res.json({ user: newUser });
    // end file upload handler
  } catch (error) {
    next(error);
  }
});
routes.post("/information", auth, async (req, res, next) => {
  const { user, values } = req.body;
  try {
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        user[key] = values[key];
      }
    }
    const newUser = await user.save();
    res.json({ user: newUser });
  } catch (error) {
    next();
  }
});

// @route   POST /api/v1/user/serach
// @desc    search for users
// @access  privat
routes.post("/search", auth, async (req, res) => {
  const { search } = req.body;
  const regex = search ? new RegExp(search) : null;
  try {
    const users = await getUserPages({ name: regex });
    if (users.length !== 0) return res.status(200).json({ users });
    res.status(200).json({ users: [{ name: "no resualt" }] });
  } catch (error) {
    res.status(500).json({ message: "Error finding Users" });
    console.log(error);
  }
});

// @route   GET /api/v1/user/suggestion
// @desc    users suggestions
// @access  privat
routes.get("/suggestion", auth, async (req, res, next) => {
  try {
    const suggest_users = await User.find().limit(5);
    if (suggest_users.length !== 0) {
      const users = [];
      for (const user of suggest_users) {
        users.push({
          _id: user._id,
          name: user.name,
          email: user.email,
          profile_img: user.profile_img,
        });
      }
      return res.status(200).json({ users });
    }
    res.status(200).json({ users: [{ name: "no suggestions" }] });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/v1/user/:search_id
// @desc    Get user by id
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
