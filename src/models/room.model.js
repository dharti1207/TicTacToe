import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomName: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isPrivate: { type: Boolean, default: false },
  joinCode: {
    type: String,
    required: function () {
      return this.isPrivate;
    },
  },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  spectators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model("Room", roomSchema);
