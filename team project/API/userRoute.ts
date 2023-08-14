import express from "express";
import { addUser, login, getUser } from "./userController";

const router = express.Router();

router.post("/api/add-user", addUser);
router.post("/api/login", login);
router.post("/api/start-game", startGame);
router.get("/api/get-user", getUser);

export default router;
