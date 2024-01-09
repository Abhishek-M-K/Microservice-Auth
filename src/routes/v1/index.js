const express = require("express");
const router = express.Router();

const UserController = require("../../controllers/user-controller");
const { AuthReqValidator } = require("../../middlewares/index");

router.post("/signup", AuthReqValidator.validateUser, UserController.create);

router.get("/users", UserController.getByEmail);

router.post("/signin", AuthReqValidator.validateUser, UserController.signIn);

module.exports = router;
