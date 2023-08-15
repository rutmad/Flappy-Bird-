"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({ name: String, password: String });
var UserModel = mongoose_1["default"].model("User", UserSchema);
exports["default"] = UserModel;
