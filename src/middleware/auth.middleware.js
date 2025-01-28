import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import { ApiResponse } from "./../utils/ApiResponse.js";
import { message } from "../utils/messages.js";
export const authenticateToken = async (req, res, next) => {
  const tokenData = req.headers.authorization;

  if (!tokenData)
    return await ApiResponse(
      res,
      httpStatus.FORBIDDEN,
      message.ACCESS_DENIED,
      {}
    );
  const token = tokenData.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
    if (err)
      return await ApiResponse(
        res,
        httpStatus.UNAUTHORIZED,
        message.INVALID_TOKEN,
        {}
      );
    req.user = user;

    next();
  });
};
