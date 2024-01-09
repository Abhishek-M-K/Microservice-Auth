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

  async signIn(email, inputPassword) {
    try {
      // step 1: get user by email
      const user = await this.userRepository.getByEmail(email);
      // step 2: compare password
      const passMatch = this.checkPassword(inputPassword, user.password);
      if (!passMatch) {
        throw new Error("Password is incorrect");
      }
      // step 3: create token
      const token = this.createToken({ email: user.email, id: user.id });
      return token;
    } catch (error) {
      console.log("Something went wrong in signIn service : ", error);
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
