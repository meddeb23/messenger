const Message = require("./models/Message");
const Device = require("../user/models/Devices");

// update Msg Status
const updateMsgStatus = async (io, messages, status) => {
  try {
    console.log("updating status to ", status);
    messages.forEach(async ({ _id }) => {
      console.log(_id);
      let msg = await Message.findById(_id);
      msg.status = status;
      const i = await msg.save();
      return i;
    });
    console.log(messages[0]);
    console.log("devices", messages[0].sender);
    const senderDevices = await Device.find({ user: messages[0].sender });
    if (senderDevices.length !== 0) {
      senderDevices.forEach((device) => {
        console.log(`ws to `, device.io_id);
        io.to(device.io_id).emit("msg_status_updated", { messages });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { updateMsgStatus };
