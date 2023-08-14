import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import usersRoute from "./API/userRoute";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("./client"));

mongoose.connect(process.env.MONGOOSE_URI || "", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use("/api/", usersRoute);

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
