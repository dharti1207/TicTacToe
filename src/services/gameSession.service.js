import { ApiError } from "../utils/ApiError.js";
import Room from "../models/room.model.js";
import User from "../models/user.model.js";
import GameSession from "../models/gameSession.model.js";
import httpStatus from "http-status";
import { generateJoinCode } from "../utils/generatecode.js";
import { message } from "../utils/messages.js";

const checkWinner = (board) => {
  const winningCombinations = [
    // Rows
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    // Columns
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    // Diagonals
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      board[a[0]][a[1]] &&
      board[a[0]][a[1]] === board[b[0]][b[1]] &&
      board[a[0]][a[1]] === board[c[0]][c[1]]
    ) {
      return true;
    }
  }

  return false;
};

const isBoardFull = (board) => {
  return board.every((row) => row.every((cell) => cell));
};

export const userStartGame = async (req) => {
  const { roomId } = req.body;
  try {
    const room = await Room.findById(roomId).populate("players");

    if (!room || room.players.length !== 2) {
      throw new ApiError(httpStatus.BAD_REQUEST, message.START_GAME_VALID_USER);
    }

    const newGame = new GameSession({
      roomId,
      players: room.players,
      turn: room.players[0],
    });

    const savedGame = await newGame.save();

    // real time notify

    const io = req.app.get("io");
    io.to(roomId).emit("join-room", { gameSession: savedSession });
    return savedGame;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
};

export const userMakeMove = async (req) => {
  const { sessionId, row, col } = req.body;
  const userId = req.user.userId;
  try {
    const game = await GameSession.findById(sessionId);

    if (!game) {
      throw new ApiError(httpStatus.BAD_REQUEST, message.GAME_NOT_FOUND);
    }

    if (game.turn.toString() !== userId) {
      throw new ApiError(httpStatus.BAD_REQUEST, message.INVALID_TURN);
    }

    if (row < 0 || row > 2 || col < 0 || col > 2 || game.boardState[row][col]) {
      throw new ApiError(httpStatus.BAD_REQUEST, message.INVALID_MOVE);
    }

    game.boardState[row][col] =
      game.turn.toString() === game.players[0].toString() ? "X" : "O";

    const winner = checkWinner(game.boardState);
    let result = null;
    if (winner) {
      game.winner = userId;
      game.turn = null;
      result = { winner: userId };
    } else if (isBoardFull(game.boardState)) {
      game.isDraw = true;
      game.turn = null;
      result = { draw: true };
    } else {
      game.turn = game.players.find((player) => player.toString() !== userId);
    }

    const updatedGame = await game.save();

    const io = req.app.get("io");
    io.to(game.roomId).emit("player-move", {
      row,
      col,
      symbol: game.boardState[row][col],
    });

    if (result) {
      io.to(game.roomId).emit("game-end", result);
    }
    return updatedGame;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
};
