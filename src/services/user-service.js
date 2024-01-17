const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserRepository = require("../repository/user-repository");
const { JWT_SECRET } = require("../config/serverConfig");
const ValidationError = require("../utils/validation-handler");
const AppErrors = require("../utils/error-handler");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        // earlier it was throwing 500 error internal server error
        // now it will throw 400 error fro bad req
        throw error;
      }
      console.log("Something went wrong in service layer ");
      throw new AppErrors(
        "ServerError",
        "Something went wrong in service layer",
        "Required fields not valid",
        500
      );
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
        console.log("Password does not match");
      }
      // step 3: create token
      const jwtToken = this.createToken({ email: user.email, id: user.id });
      return jwtToken;
    } catch (error) {
      console.log("Something went wrong in signIn service : ", error);
    }
  }

  async isUserAuthenticated(token) {
    try {
      const isTokenValid = this.verifyToken(token);
      if (!isTokenValid) {
        console.log("Token is not valid");
      }

      const user = await this.userRepository.getByEmail(isTokenValid.email);
      if (!user) {
        console.log("User does not exist");
      }

      return user.id;
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

  isAdmin(id) {
    try {
      return this.userRepository.isAdmin(id);
    } catch (error) {
      console.log("Something went wrong in service layer: ", error);
    }
  }

  /* NOT NECESSARY SINCE IN MODEL SCHEMA , ITS HAVING VALIDATION FOR EMAIL
  validateMail(email) {
    try {
      const isValid = validator.validate(email);
      if (!isValid) {
        console.log("Please enter a valid email");
      }
    } catch (error) {
      console.log("Something went wrong in email validation : ", error);
    }
  }
*/
}

module.exports = UserService;
