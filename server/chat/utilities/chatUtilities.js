const Chat = require("../models/Chat");
const Message = require("../models/Message");

const getChatById = async (_id) => {
  return await Chat.findById({ _id })
    .populate({ path: "receiver", select: "-password -register_date " })
    .lean();
};
const getChatPages = async (query = {}, page = 0, perPage = 20) => {
  return await Chat.find(query)
    .populate({ path: "receiver", select: "-password -register_date " })
    .sort({ updated_at: -1 })
    .limit(perPage)
    .skip(perPage * page)
    .select("-deleted -sender")
    .lean();
};
const getMsgPages = async (query = {}, page = 0, perPage = 20) => {
  return await Message.find(query)
    // .sort({ send_Date: -1 })
    .limit(perPage)
    .skip(perPage * page);
};

module.exports = { getChatById, getChatPages, getMsgPages };
