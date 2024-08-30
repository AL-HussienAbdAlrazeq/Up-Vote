import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { catchError } from "../../middleware/catchError";
import { User } from "../../../database/models/user.model";
import { message } from "../../utils/common/messages";
import { AppError } from "../../utils/AppError";

const addUser = catchError(async (req, res, next) => {
  let userExist = await User.findOne({ email: req.body.email });
  if (userExist) {
    return next(new AppError(message.user.userAlreadyExist, 409));
  }
  const user = new User(req.body);
  await user.save();
  res.status(201).json({ message: "Success", user });
});

const getAllUsers = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();
    res.status(200).json({ message: "Success", users });
  }
);

const getUser = catchError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  user || next(new AppError("User Not Found", 404));
  !user || res.status(200).json({ message: "Success", user });
});

const deleteUser = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.findByIdAndDelete(req.params.id);
    if (!users) {
      return next(new AppError(message.user.userNotFound, 404));
    }
    res.status(200).json({ message: message.user.deleteUser, users });
  }
);

const updateUser = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!users) {
      return next(new AppError(message.user.userNotFound, 404));
    }


    res.status(200).json({ message: message.user.updateUser  });
  }
);

export { getAllUsers, deleteUser, updateUser, getUser, addUser };
