"use strict";
exports.__esModule = true;
var express_1 = require("express");
var loginController_1 = require("./loginController");
var router = express_1["default"].Router();
router.post("/auth/login", loginController_1.login);
exports["default"] = router;
