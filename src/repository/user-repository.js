const { StatusCodes } = require("http-status-codes");

const { User, Role } = require("../models/index");
const ValidationError = require("../utils/validation-handler");
const ClientError = require("../utils/client-error");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      console.log("Something went wrong in repository layer : ", error);
    }
  }

  async destroy(id) {
    try {
      const user = await User.destroy({ where: { id: id } });
      return user;
    } catch (error) {
      console.log("Something went wrong in repository layer : ", error);
    }
  }

  async getByEmail(userMail) {
    try {
      const user = await User.findOne({
        where: {
          email: userMail,
        },
        attributes: ["id", "email"],
      });
      if (!user) {
        throw new ClientError(
          "AttributeNotFound",
          "Invalid email sent in the request",
          "Enter the valid email, as this does not exists",
          StatusCodes.NOT_FOUND
        );
      }
      return user;
    } catch (error) {
      console.log("Something went wrong in repository layer :", error);
    }
  }

  async isAdmin(id) {
    try {
      const user = await User.findByPk(id);
      const adminRole = await Role.findOne({
        where: {
          name: "ADMIN",
        },
      });
      return user.hasRole(adminRole);
    } catch (error) {
      console.log("Something went wrong in repository layer : ", error);
    }
  }
}

module.exports = UserRepository;
