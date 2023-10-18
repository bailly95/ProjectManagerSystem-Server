const express = require("express");
const router = express.Router();

const { authJwt } = require("../middlewares");
const controller = require("../controllers/admin.controller");

router.post("/addservice",[authJwt.verifyToken,authJwt.isAdmin],controller.addServices);


module.exports = router;
