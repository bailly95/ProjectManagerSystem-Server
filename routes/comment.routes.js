const express = require("express");
const router = express.Router();

const { authJwt } = require("../middlewares");
const controller = require("../controllers/comment.controller");

router.post("/", authJwt.verifyToken, controller.createComment);
router.get("/:taskId", authJwt.verifyToken, controller.getAllCommentsByTaskId);

module.exports = router;
