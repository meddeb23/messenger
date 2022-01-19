const User = require("../models/User");

const getUserPages = async (query = {}, page = 0, perPage = 20) => {
  return await User.find(query)
    .populate({ path: "user", select: "name profile_img email" })
    .sort({ created_at: -1 })
    .limit(perPage)
    .skip(perPage * page);
};

module.exports = { getUserPages };
