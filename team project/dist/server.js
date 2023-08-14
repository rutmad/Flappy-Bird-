"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var dotenv_1 = require("dotenv");
var userRoute_1 = require("./API/userRoute");
dotenv_1["default"].config();
var app = express_1["default"]();
app.use(express_1["default"].json());
app.use(express_1["default"].static("./client"));
mongoose_1["default"].connect(process.env.MONGOOSE_URI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
app.use("/api/", userRoute_1["default"]);
app.listen(3001, function () {
    console.log("Server listening on port 3001");
});
