import express from "express";
const router = express.Router();
import { addUser, login, getUser } from "./userController";

router
  .post("/login", login)
  .post("/add-user", addUser)
  .get("/get-user", getUser);

export default router;