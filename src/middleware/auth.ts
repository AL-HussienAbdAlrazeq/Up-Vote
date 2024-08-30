import jwt from "jsonwebtoken";

import { AppError } from "../utils/AppError";
import { NextFunction, Response, Request } from "express";
import { message } from "../utils/common/messages";
import { User } from "../../database/models/user.model";
import { status, systemRoles } from "../utils/common/enum";
import { catchError } from "./catchError";

export const auth = (roles = Object.values(systemRoles)) => {
  return catchError(async (req: any, res: Response, next: NextFunction) => {
    const {token} = req.headers;
    if (!token) {
      return next(new AppError("Token is required", 409));
    }
    const decode: any = jwt.verify(token, "my-secret-key");
    if (!decode.userId || !decode) {
      return next(new AppError(message.token.invalidPayload, 400));
    }

    const authUser: any = await User.findById(decode.userId);
    if (!authUser) {
      return next(new AppError("Please Signup first", 404));
    }

    if (!roles.includes(authUser.role)) {
      return next(new AppError(message.user.unAuthorization, 401));
    }
    req.user = authUser;
    next();
  });
};



