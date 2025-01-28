import express from "express";
const app = express.Router();
import authRoutes from "./auth.routes.js";
import roomRoutes from "./room.routes.js";
import gameRoutes from "./game.route.js";
import http from "http";
import { Server } from "socket.io";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use("/auth", authRoutes);
app.use("/rooms", roomRoutes);
app.use("/game", gameRoutes);

io.on("connection", (socket) => {
  // Join room
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("player-move", ({ roomId, move }) => {
    io.to(roomId).emit("move-made", move);
  });
  // Notify room of game result
  socket.on("game-end", ({ roomId, result }) => {
    io.to(roomId).emit("game-ended", result);
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

export default app;
