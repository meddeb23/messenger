const { server } = require("./app");

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`Server is running in ${process.env.NODE_ENV} on Port ${PORT}`)
);
