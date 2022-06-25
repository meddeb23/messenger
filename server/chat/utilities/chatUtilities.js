const Chat = require("../models/Chat");
const Message = require("../models/Message");

const getChatById = async (_id) => {
  return await Chat.findById({ _id })
    .populate({ path: "receiver", select: "-password -register_date " })
    .populate({ path: "sender", select: "-password -register_date -__v" })
    .lean();
};
const getChatPages = async (query = {}, page = 0, perPage = 20) => {
  return await Chat.find(query)
    .populate({ path: "receiver", select: "-password -register_date -__v" })
    .populate({ path: "sender", select: "-password -register_date -__v" })
    .sort({ updated_at: -1 })
    .limit(perPage)
    .skip(perPage * page)
    .select("-deleted -__v")
    .lean();
};
const getMsgPages = async (query = {}, page = 0, perPage = 20) => {
  const messages = await Message.find(query)
    .sort({ send_Date: -1 })
    .limit(perPage + 1)
    .skip(perPage * page);
  console.log(messages);
  return {
    messages: messages.slice(0, -1),
    nextPage: messages.length > perPage,
  };
};

module.exports = Object.freeze({ getChatById, getChatPages, getMsgPages });
