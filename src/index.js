const express = require("express");
const app = express();
const { PORT } = require("./config/serverConfig");

const prepareNStartServer = async () => {
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
};

prepareNStartServer();
