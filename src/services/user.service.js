import { ApiError } from "./../utils/ApiError.js";
import { message } from "./../utils/messages.js";
import bcrypt from "bcryptjs";
import User from "./../models/user.model.js";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";

export const userRegister = async (data) => {
  try {
    const { username, email, password } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, message.USER_ALREADY_EXIST);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();

    return newUser;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
};

export const userLogin = async (req) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(httpStatus.BAD_REQUEST, message.USER_NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ApiError(httpStatus.UNAUTHORIZED, message.USER_LOGIN_SUCCESS);
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );

    const data = { token, userId: user._id };

    return data;
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
};
