"use strict";
exports.__esModule = true;
var express_1 = require("express");
var userController_1 = require("./userController");
var router = express_1["default"].Router();
router.post("/api/add-user", userController_1.addUser);
router.post("/api/login", userController_1.login);
router.get("/api/get-user", userController_1.getUser);
exports["default"] = router;
