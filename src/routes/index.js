const express = require("express");
const apiV1Routes = require("./v1/index");

const router = express.Router();

router.use("/v1", apiV1Routes);

module.exports = router;
