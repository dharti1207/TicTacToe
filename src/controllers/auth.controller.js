import { userLogin, userRegister } from "../services/user.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { message } from "../utils/messages.js";
import httpStatus from "http-status";

export const register = async (req, res) => {
  try {
    const user = await userRegister(req.body);

    return await ApiResponse(
      res,
      httpStatus.CREATED,
      message.USER_REGISTERED,
      {}
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

export const login = async (req, res) => {
  try {
    const user = await userLogin(req);

    return await ApiResponse(res, httpStatus.OK, message.USER_LOGIN, user);
  } catch (error) {
    return await ApiResponse(
      res,
      error.statusCode ? error.statusCode : httpStatus.SERVICE_UNAVAILABLE,
      error.message,
      {}
    );
  }
};
