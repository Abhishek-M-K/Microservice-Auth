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

  //   async findByEmail(email) {
  //     return await User.findOne({ where: { email: email } });
  //   }
}

module.exports = UserRepository;
