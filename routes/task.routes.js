const express = require("express");
const router = express.Router();

const { authJwt } = require("../middlewares");
const controller = require("../controllers/task.controller");

router.post("/", authJwt.verifyToken, controller.createTask);
router.get("/:id", authJwt.verifyToken, controller.getTask);

router.put("/:id", authJwt.verifyToken, controller.updateTask);

router.patch("/:id/status/:status", authJwt.verifyToken, controller.updateStatusTask);

module.exports = router;
