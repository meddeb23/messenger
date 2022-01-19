const User = require("../../user/models/User");

const getUser = async (query) => {
  return await User.findById(query).select("name profile_img email login");
};

module.exports = { getUser };
