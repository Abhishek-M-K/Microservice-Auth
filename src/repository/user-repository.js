const { User } = require("../models/index");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
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
}

module.exports = UserRepository;
