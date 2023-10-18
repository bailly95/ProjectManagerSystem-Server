const express = require("express");
const router = express.Router();

const { authJwt } = require("../middlewares");
const controller = require("../controllers/project.controller");

router.get(
  "/all",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.getAllProjects
);

router.post("/", authJwt.verifyToken, controller.createProject);

router.get("/:projectId", authJwt.verifyToken, controller.getProject);

router.delete("/:projectId", authJwt.verifyToken, controller.deleteProject);

router.post(
  "/assign/:projectId",
  [authJwt.verifyToken, authJwt.isProjectOwner],
  controller.assignProject
);

router.get(
  "/id/:projectId/users",
  authJwt.verifyToken,
  controller.getUsersByProject
);

module.exports = router;
