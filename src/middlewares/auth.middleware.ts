import { NextFunction, Request, Response } from "express";
import AppError from "./error_handler.middleware";
import { ERROR_CODES } from "../types/enum.types";
import { verifyToken } from "../utils/jwt.utils";

export const authenticate = () => {
  // middleware
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // cookies
      const cookies = req.cookies;
      console.log(cookies);
      // get token
      const token = cookies["access_token"];
      console.log(token);
      if (!token) {
        throw new AppError(
          "Unauthorized.Access denied",
          ERROR_CODES.AUTH_ERR,
          401,
        );
      }
      // verify token
      const decodedData = verifyToken(token);
      if (!decodedData) {
        throw new AppError("Invalid token.", ERROR_CODES.AUTH_ERR, 400);
      }
      console.log(decodedData);
      // check expired
      if (decodedData.exp * 1000 < Date.now()) {
        throw new AppError(
          "Unauthorized.Access denied",
          ERROR_CODES.AUTH_ERR,
          401,
        );
      }

      // is user exists

      // check role
      // next()
      next();
    } catch (error) {
      next(error);
    }
  };
};
