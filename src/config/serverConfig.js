const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  SALT: bcrypt.genSaltSync(10),
  JWT_SECRET: process.env.JWT_SECRET,
};
