const { User, Role } = require("../models/index");
const ValidationError = require("../utils/validation-handler");

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

  async getByEmail(data) {
    try {
      const user = await User.findOne({
        where: {
          email: data,
        },
        attributes: ["id", "email"],
      });
      return user;
    } catch (error) {
      console.log("Something went wrong in repository layer : ", error);
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
