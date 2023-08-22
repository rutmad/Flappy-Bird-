import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import usersRoute from "./API/usersRoute";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

dotenv.config();

const uri: string | undefined = process.env.MONGOOSE_URI + "flappybird";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static("./client"));

if (uri) {
  mongoose
    .connect(uri)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB error:", err));
} else {
  console.log("No URI");
}

app.use("/api/", usersRoute);
app.use(bodyParser.json());

app.listen(3001, () => {
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
