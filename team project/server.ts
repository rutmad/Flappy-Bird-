import express from "express";
import mongoose, { Schema } from "mongoose";
import * as dotenv from "dotenv";
import usersRoute from "./API/loginRoute";
import cookieParser from "cookie-parser";

dotenv.config();

const uri: string | undefined = process.env.MONGOOSE_URI + "FLAPPY-BIRD";

if (uri) {
  mongoose
    .connect(uri)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB error :", err));
} else {
  console.log("No URI");
}

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(express.static("./client"));

app.use("/api/", usersRoute);

app.listen(3001, () => {
  console.log("server listen on port 3001");
});
