import { ApiResponse } from "../utils/ApiResponse.js";
import httpStatus from "http-status";
import { message } from "../utils/messages.js";
import {
  createUserRoom,
  joinUserRoom,
  activeUserRoom,
} from "./../services/room.service.js";

export const createRoom = async (req, res) => {
  try {
    const newRoom = await createUserRoom(req);

    return await ApiResponse(
      res,
      httpStatus.CREATED,
      message.ROOM_CREATED,
      newRoom
    );
  } catch (error) {
    return await ApiResponse(
      res,
      error.statusCode ? error.statusCode : httpStatus.SERVICE_UNAVAILABLE,
      {}
    );
  }
};

export const joinRoom = async (req, res) => {
  try {
    const room = await joinUserRoom(req);

    return await ApiResponse(
      res,
      httpStatus.CREATED,
      message.ROOM_CREATED,
      room
    );
  } catch (error) {
    return await ApiResponse(
      res,
      error.statusCode ? error.statusCode : httpStatus.SERVICE_UNAVAILABLE,
      error.message,
      {}
    );
  }
};

export const activeRoom = async (req, res) => {
  try {
    const room = await activeUserRoom();

    return await ApiResponse(
      res,
      httpStatus.CREATED,
      message.FETCHED_ACTIVE_ROOMS,
      room
    );
  } catch (error) {
    return await ApiResponse(
      res,
      error.statusCode ? error.statusCode : httpStatus.SERVICE_UNAVAILABLE,
      error.message,
      {}
    );
  }
};
