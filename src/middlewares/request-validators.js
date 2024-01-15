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

const validateAdminReq = (req, res, next) => {
  if (!req.body.id) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
      error: "Id is missing",
      data: {},
    });
  }
  next();
};

module.exports = {
  validateUser,
  validateAdminReq,
};
