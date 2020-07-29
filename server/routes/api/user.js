const express = require("express");
const { resolveInclude } = require("ejs");
const routes = express.Router();

// @route   GET /api/v1/user/login
// @desc    login user
// @access  public
routes.get("/login", (req, res) => {
  res.send("login user");
});

// @route   GET /api/v1/user/register
// @desc    login user
// @access  public
routes.get("/register", (req, res) => {
  res.send("register user");
});

// @route   GET /api/v1/user/logout
// @desc    login user
// @access  public
routes.get("/logout", (req, res) => {
  res.send("logout user");
});

module.exports = routes;
