import { ApiResponse } from "../utils/ApiResponse.js";
import httpStatus from "http-status";
import { message } from "../utils/messages.js";
import {
  userStartGame,
  userMakeMove,
} from "./../services/gameSession.service.js";

export const startGame = async (req, res) => {
  try {
    const newGame = await userStartGame(req);

    return await ApiResponse(
      res,
      httpStatus.CREATED,
      message.GAME_START,
      newGame
    );
  } catch (error) {
    return await ApiResponse(
      res,
      error.statusCode ? error.statusCode : httpStatus.SERVICE_UNAVAILABLE,
      {}
    );
  }
};

export const makeMove = async (req, res) => {
  try {
    const newGame = await userMakeMove(req);

    return await ApiResponse(
      res,
      httpStatus.CREATED,
      message.MOVE_MADE,
      newGame
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
