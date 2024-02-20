const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserRepository = require("../repository/user-repository");
const { JWT_SECRET } = require("../config/serverConfig");
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
      // throw new AppErrors(
      //   "ServerError",
      //   "Something went wrong in service layer",
      //   "Required fields not valid",
      //   500
      // ); 
      throw error;
    }
  }

  /*async getByEmail(userMail) {
    try {
      const user = await this.userRepository.getByEmail(userMail);
      return user;
    } catch (error) {
      console.log("Something went wrong in service layer ");
    }
  }*/

  async signIn(email, plainPassword) {
    try {
      // step 1: get user by email
      const user = await this.userRepository.getByEmail(email);
      // if (!user) {
      //   throw new AppErrors(
      //     "AttributeNotFound",
      //     "Invalid email sent in the request",
      //     "Enter the valid email, as this does not exists",
      //     404
      //   );
      // }
      // step 2: compare password
      const passMatch = await this.checkPassword(plainPassword, user.password);
      if (!passMatch) {
        console.log("Password does not match");
        throw { error: "Password is incorrect" };
      }
      // step 3: create token
      const jwtToken = this.createToken({ email: user.email, id: user.id });
      return jwtToken;
    } catch (error) {
      if (error.name === "AttributeNotFound") {
        throw error;
      }
      console.log("Something went wrong in signIn service : ");
      throw error;
    }
  }

  async isUserAuthenticated(token) {
    try {
      const isTokenValid = this.verifyToken(token);
      if (!isTokenValid) {
        console.log("Token is not valid");
      }

      const user = await this.userRepository.getById(isTokenValid.email);
      if (!user) {
        console.log("User does not exist");
      }

      return user.id;
    } catch (error) {
      console.log("Something went wrong in signIn service : ", error);
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
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

  /*  TRY n RUN example
      if (error.name === "AttributeNotFound") {
        throw error;
      }
      throw new AppErrors(
        "ClientError",
        "Something went wrong in service layer",
        "Required fields not valid",
        404
      );
      */
}

module.exports = UserService;
