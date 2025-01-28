import mongoose from "mongoose";

const gameSessionSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  boardState: {
    type: [[String]],
    default: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
  },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  turn: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  isDraw: { type: Boolean, default: false },
});

export default mongoose.model("GameSession", gameSessionSchema);
