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

router.post("/", authJwt.verifyToken, controller.createProject);

router.delete("/:projectId", authJwt.verifyToken, controller.deleteProject);

router.post("/assign/:projectId", [authJwt.verifyToken, authJwt.isProjectOwner], controller.assignProject);

module.exports = router;
