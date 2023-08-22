"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var dotenv_1 = require("dotenv");
var usersRoute_1 = require("./API/usersRoute");
var cookie_parser_1 = require("cookie-parser");
var body_parser_1 = require("body-parser");
dotenv_1["default"].config();
var uri = process.env.MONGOOSE_URI + "flappybird";
var app = express_1["default"]();
app.use(express_1["default"].json());
app.use(cookie_parser_1["default"]());
app.use(express_1["default"].static("./client"));
if (uri) {
    mongoose_1["default"]
        .connect(uri)
        .then(function () { return console.log("DB connected"); })["catch"](function (err) { return console.log("DB error:", err); });
}
else {
    console.log("No URI");
}
app.use("/api/", usersRoute_1["default"]);
app.use(body_parser_1["default"].json());
app.listen(3001, function () {
    console.log("Server listening on port 3001");
});
// adding code
// ------------------------------------------------
// app.use(bodyParser.json());
// Replace the url with your MongoDB connection string
// const url =
//   "mongodb+srv://dyderune:project2@team2-flappybird-projec.hapnhup.mongodb.net/";
// const dbName = "flappyBird";
// let db;
// Connect to MongoDB
// MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
//     if (err) throw err;
//     console.log("Connected to MongoDB");
//     db = client.db(dbName);
// });
// Endpoint to store score
// app.post("/saveScore", (req, res) => {
//   const score = req.body.score;
// Add error checks as necessary
// db.collection('scores').insertOne({ score: score }, (err, result) => {
//     if (err) {
//         res.status(500).send({ error: "Failed to save score" });
//         return;
//     }
//     res.send({ success: true });
// });
// });
// app.listen(3001, () => {
//   console.log("Server listening on port 3001");
// });
