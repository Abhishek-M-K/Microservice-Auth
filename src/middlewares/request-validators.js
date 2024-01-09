const validateUser = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
      error: "Email or password is missing",
      data: {},
    });
  }
  next();
};

module.exports = {
  validateUser,
};
