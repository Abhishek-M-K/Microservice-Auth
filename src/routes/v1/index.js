const express = require("express");
const router = express.Router();

const UserController = require("../../controllers/user-controller");
const { AuthReqValidator } = require("../../middlewares/index");

router.post("/signup", AuthReqValidator.validateUser, UserController.create);
router.post("/signin", AuthReqValidator.validateUser, UserController.signIn);
router.get("/users", UserController.getByEmail);
router.get("/isUserAuthenticated", UserController.isUserAuthenticated);
router.get(
  "/isAdmin",
  AuthReqValidator.validateAdminReq,
  UserController.isAdmin
);

module.exports = router;
