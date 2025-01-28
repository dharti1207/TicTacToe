import { ApiError } from "../utils/ApiError.js";
import Room from "../models/room.model.js";
import User from "../models/user.model.js";
import httpStatus from "http-status";
import { generateJoinCode } from "../utils/generatecode.js";
import { message } from "../utils/messages.js";

export const createUserRoom = async (req) => {
  const { roomName, isPrivate } = req.body;
  const userId = req.user.userId;

  try {
    const joinCode = isPrivate ? generateJoinCode() : null;

    const newRoom = new Room({
      roomName,
      createdBy: userId,
      isPrivate,
      joinCode,
      players: [userId],
    });

    const savedRoom = await newRoom.save();
    return savedRoom;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
};

export const joinUserRoom = async (req) => {
  const { roomId, joinCode } = req.body;
  const userId = req.user.userId;

  try {
    const room = await Room.findById(roomId);

    if (!room) {
      throw new ApiError(httpStatus.BAD_REQUEST, message.USER_ALREADY_EXIST);
    }

    if (room.isPrivate && room.joinCode !== joinCode) {
      throw new ApiError(httpStatus.FORBIDDEN, message.INVALID_JOIN_CODE);
    }

    if (room.players.length >= 2) {
      throw new ApiError(httpStatus.FORBIDDEN, message.ROOM_IS_ALREADY_FULL);
    }

    if (room.players.includes(userId)) {
      throw new ApiError(httpStatus.BAD_REQUEST, message.PLAYER_ALREADY_EXIST);
    }

    room.players.push(userId);
    await room.save();

    return room;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
};

export const activeUserRoom = async () => {
  try {
    const activeRooms = await Room.find({
      isPrivate: false,
      "players.1": { $exists: false },
    })
      .populate("createdBy", "username email")
      .select("roomName createdBy players");

    return activeRooms;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
};
