"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var userController_1 = require("./userController");
router
    .post("/login", userController_1.login)
    .post("/add-user", userController_1.addUser)
    .get("/get-user", userController_1.getUser)
    .post("/saveScore", userController_1.saveScore)
    .get("/leaderboard", userController_1.getLeaderboard);
exports["default"] = router;
