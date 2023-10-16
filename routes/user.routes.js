const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const { authJwt } = require("../middlewares");

router.get("/:id", authJwt.verifyToken, controller.getUserById);

router.post(
  "/assign/:creatorId/:userId/project/:projectId",
  [authJwt.isProjectOwner, authJwt.verifyToken],
  controller.addProject
);

router.put("/update/:userId", [authJwt.verifyToken], controller.updateUser);

router.delete("/delete/:userId", [authJwt.verifyToken], controller.deleteUser);

router.post("/forgotpassword", controller.forgotPassword);

router.post("/updatepassword", controller.updatePassword);

// router.get("/:userId/project", authJwt.verifyToken, controller.getProjectByUserId);
router.get("/:userId/project", controller.getProjectByUserId);

module.exports = router;
