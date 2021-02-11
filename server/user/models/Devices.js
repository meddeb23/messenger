const { Mongoose } = require("mongoose");

const { Schema, model } = require("mongoose");

const DeviceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  // device: {
  //   type: String,
  //   require: true,
  // },
  io_id: {
    type: String,
    default: "",
  },
});

const Device = model("device", DeviceSchema);

module.exports = Device;
