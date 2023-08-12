"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var dotenv = require("dotenv");
var loginRoute_1 = require("./API/loginRoute");
var cookie_parser_1 = require("cookie-parser");
dotenv.config();
var uri = process.env.MONGOOSE_URI + "FLAPPY-BIRD";
if (uri) {
    mongoose_1["default"]
        .connect(uri)
        .then(function () { return console.log("DB connected"); })["catch"](function (err) { return console.log("DB error :", err); });
}
else {
    console.log("No URI");
}
var app = express_1["default"]();
app.use(express_1["default"].json());
app.use(cookie_parser_1["default"]());
app.use(express_1["default"].static("./client"));
app.use("/api/", loginRoute_1["default"]);
app.listen(3001, function () {
    console.log("server listen on port 3001");
});
