const mongoose = require("mongoose");

const dbURI =
  process.env.NODE_ENV === "developement"
    ? "mongodb://localhost/Messenger"
    : process.env.MONGO_URI;

mongoose.set("useCreateIndex", true);

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () =>
  console.log(`mongoose is connected to ${dbURI}`)
);

mongoose.connection.on("error", (err) =>
  console.log(`Error connecting to db:\n ${err}`)
);

mongoose.connection.on("disconnected", () =>
  console.log(`Mongoose is disconnected`)
);

process.on("SIGINT", () => {
  console.log("Mongoose disconnected on exit process");
  process.exit(0);
});

module.exports = mongoose;
