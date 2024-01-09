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

module.exports = {
  create,
};
