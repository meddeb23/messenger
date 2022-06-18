const Message = require("./models/Message");
const Device = require("../user/models/Devices");

// update Msg Status
const updateMsgStatus = async (io, msg, status) => {
  try {
    console.log("updating status to ", status);
    let newMsg = await Message.findById(msg._id);
    newMsg.status = status;
    newMsg = await newMsg.save();
    const senderDevices = await Device.find({ user: msg.sender });
    if (senderDevices.length !== 0) {
      senderDevices.forEach((device) => {
        io.to(device.io_id).emit("msg_status_updated", { msg: newMsg });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { updateMsgStatus };
