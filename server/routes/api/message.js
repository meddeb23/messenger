const express = require("express");
const routes = express.Router();

const { auth } = require("../../middleware/auth");

const User = require("../../model/User");

// @route   GET /api/v1/user
// @desc    user info
// @access  privet
routes.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.body.user_id.id);
    console.log(user.email);
    res.status(200).json({
      user: { email: user.email, name: user.name },
    });
  } catch (error) {
    console.log("Error finding User");
  }
});

module.exports = routes;
