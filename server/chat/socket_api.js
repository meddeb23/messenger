const Message = require("./models/Message");
const User = require("../user/models/User");

// update Msg Status
const updateMsgStatus = async (io, msg, status) => {
  try {
    let newMsg = await Message.findById(msg._id);
    newMsg.status = status;
    newMsg = await newMsg.save();
    console.log(newMsg);
    const user = await User.findById(msg.sender);
    io.to(user.io_id).emit("msg_status_updated", { status, msg });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { updateMsgStatus };
