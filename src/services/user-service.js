const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserRepository = require("../repository/user-repository");
const { JWT_SECRET } = require("../config/serverConfig");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in service layer : ", error);
    }
  }

  async getByEmail(data) {
    try {
      const user = await this.userRepository.getByEmail(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in service layer : ", error);
    }
  }

  checkPassword(inputPassword, encryptedPassword) {
    try {
      const result = bcrypt.compareSync(inputPassword, encryptedPassword);
      return result;
    } catch (error) {
      console.log("Something went wrong in password validation : ", error);
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_SECRET, { expiresIn: "2h" });
      return result;
    } catch (error) {
      console.log("Something went wrong in token creation : ", error);
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_SECRET);
      return response;
    } catch (error) {
      console.log("Something went wrong in token validation : ", error);
    }
  }
}

module.exports = UserService;
