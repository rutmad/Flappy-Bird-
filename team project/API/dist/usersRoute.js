"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var userController_1 = require("./userController");
router
    .post("/login", userController_1.login)
    .post("/add-user", userController_1.addUser)
    .post("/saveScore", userController_1.saveScore)
    .get("/get-user", userController_1.getUser);
exports["default"] = router;
