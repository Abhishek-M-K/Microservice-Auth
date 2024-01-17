"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

const { SALT } = require("../config/serverConfig");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, {
        through: "user_roles",
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Use validator package to validate email
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 50], // Use validator package to validate password length
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user) => {
    const hashPassword = bcrypt.hashSync(user.password, SALT);
    user.password = hashPassword;
  });

  return User;
};
