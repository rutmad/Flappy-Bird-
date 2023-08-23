import express from "express";
const router = express.Router();
import {
  addUser,
  login,
  getUser,
  saveScore,
  getLeaderboard,
} from "./userController";

router
  .post("/login", login)
  .post("/add-user", addUser)
  .get("/get-user", getUser)
  .post("/saveScore", saveScore)
  .get("/leaderboard", getLeaderboard);

export default router;
