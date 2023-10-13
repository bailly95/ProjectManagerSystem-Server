const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const { authJwt } = require("../middlewares");

router.get("/:id", authJwt.verifyToken, controller.getUserById);

module.exports = router;
