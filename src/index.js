const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");
const apiV1Routes = require("./routes/index");

const db = require("./models/index");
const { User, Role } = require("./models/index");

const prepareServer = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiV1Routes);

  app.listen(PORT, async () => {
    console.log(`Server started at port: ${PORT}`);
    //sync the database
    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }

    /* Assign a user to an ADMIN role
    const user = await User.findByPk(4);
    const role = await Role.findByPk(1);

    await user.addRole(role);
    */
  });
};

prepareServer();
