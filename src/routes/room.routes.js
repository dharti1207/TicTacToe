import express from "express";
const router = express.Router();
import {
  activeRoom,
  createRoom,
  joinRoom,
} from "../controllers/room.controller.js";
import { authenticateToken } from "./../middleware/auth.middleware.js";

router.post("/create", authenticateToken, createRoom);
router.post("/join", authenticateToken, joinRoom);
router.get("/active", authenticateToken, activeRoom);

export default router;
