const express = require("express");
const router = express.Router();

const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const authJwtMiddleware = require("../middlewares/authJwt.middleware");

router.post(
  "/signup",
  [verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted,authJwtMiddleware.isAdminOrRh],
  controller.signup
);

router.post("/signin", controller.signin);

module.exports = router;
