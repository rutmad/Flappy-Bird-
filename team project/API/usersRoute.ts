import express from "express";
const router = express.Router();
import { addUser, login, getUser, saveScore } from "./userController";

router
  .post("/login", login)
  .post("/add-user", addUser)
  .post("/saveScore", saveScore)
  .get("/get-user", getUser);

export default router;
