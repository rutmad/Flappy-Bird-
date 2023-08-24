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
