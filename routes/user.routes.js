const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const { authJwt } = require("../middlewares");

router.get("/profile/:id", authJwt.verifyToken, controller.getUserById);

router.post(
  "/assign/:creatorId/:userId/project/:projectId",
  controller.addProject
);

router.put(
  "/updatepassword/:userId",
  [authJwt.verifyToken],
  controller.updatePasswordUser
);

router.put(
  "/update/:userId",
  [authJwt.verifyToken],
  controller.updateUser
);

router.delete("/delete/:userId", [authJwt.verifyToken], controller.deleteUser);

router.post("/forgotpassword", controller.forgotPassword);

router.post("/updatepassword", controller.updatePassword);

router.get("/id/:userId/project", authJwt.verifyToken, controller.getProjectByUserId);

router.get("/all/:userId", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllUsers);

module.exports = router;
