"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var dotenv_1 = require("dotenv");
var userRoute_1 = require("./API/userRoute");
dotenv_1["default"].config();
var uri = process.env.MONGOOSE_URI + "flappybird";
var app = express_1["default"]();
app.use(express_1["default"].json());
app.use(express_1["default"].static("./client"));
if (uri) {
    mongoose_1["default"]
        .connect(uri)
        .then(function () { return console.log("DB connected"); })["catch"](function (err) { return console.log("DB error :", err); });
}
else {
    console.log("No URI");
}
app.use("/api/", userRoute_1["default"]);
app.listen(3001, function () {
    console.log("Server listening on port 3001");
});
