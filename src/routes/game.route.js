import express from "express";
const router = express.Router();
import { makeMove, startGame } from "../controllers/game.controller.js";
import { authenticateToken } from "./../middleware/auth.middleware.js";

router.post("/start", authenticateToken, startGame);
router.post("/move", authenticateToken, makeMove);

export default router;
