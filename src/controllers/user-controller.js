const UserService = require("../services/user-service");

const userServiceInstance = new UserService();

const create = async (req, res) => {
  try {
    const response = await userServiceInstance.create({
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({
      success: true,
      data: response,
      err: {},
      message: "User created successfully",
    });
  } catch (error) {
    console.log("Something went wrong in controller layer : ", error);
    res.status(500).json({
      success: false,
      data: {},
      err: error,
      message: "Not able to create user",
    });
  }
};

const getByEmail = async (req, res) => {
  try {
    const response = await userServiceInstance.getByEmail(req.query.email);
    return res.status(200).json({
      success: true,
      data: response,
      err: {},
      message: "User fetched successfully",
    });
  } catch (error) {
    console.log("Something went wrong in controller layer : ", error);
    res.status(500).json({
      success: false,
      data: {},
      err: error,
      message: "Not able to fetch user",
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await userServiceInstance.signIn(
      req.body.email,
      req.body.password
    );
    return res.status(200).json({
      success: true,
      data: response,
      err: {},
      message: "User signin successfully",
    });
  } catch (error) {
    console.log("Something went wrong in controller layer : ", error);
    res.status(500).json({
      success: false,
      data: {},
      err: error,
      message: "Not able to signIn the user",
    });
  }
};

//bearer token or bearer authentication is the authentication mechanism
//where the user has to send the token in the header of the request
const isUserAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await userServiceInstance.isUserAuthenticated(token);
    return res.status(200).json({
      success: true,
      data: response,
      err: {},
      message: "User authenticated successfully",
    });
  } catch (error) {
    console.log("Something went wrong in controller layer : ", error);
    res.status(500).json({
      success: false,
      data: {},
      err: error,
      message: "User not authenticated",
    });
  }
};

module.exports = {
  create,
  getByEmail,
  signIn,
  isUserAuthenticated,
};
