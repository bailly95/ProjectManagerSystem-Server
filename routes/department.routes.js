const express = require("express");
const router = express.Router();

const { authJwt } = require("../middlewares");
const controller = require("../controllers/department.controller");

router.get("/", controller.getAllServices);

module.exports = router;
