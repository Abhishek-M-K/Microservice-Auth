const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");
const apiV1Routes = require("./routes/index");

const db = require("./models/index");

const prepareServer = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiV1Routes);

  app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
    //sync the database
    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }
  });
};

prepareServer();
