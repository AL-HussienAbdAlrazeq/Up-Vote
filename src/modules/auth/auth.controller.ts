import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { User } from "../../../database/models/user.model";
import { catchError } from "../../middleware/catchError";
import { sendEmail } from "../../email/email";
import { AppError } from "../../utils/AppError";
import { message } from "../../utils/common/messages";
import { status } from "../../utils/common/enum";

const signUp = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.insertMany(req.body);
    sendEmail(req.body.email);
    user[0].password = undefined;
    res.status(200).json({ message: message.user.createUser, user });
  }
);

const verifyAccount = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    const decode = jwt.verify(
      token,
      "my-secret-key",
      async (err: any, decode: any) => {
        if (err) {
          return next(new AppError(err, 401));
        } else {
          const user = await User.findOneAndUpdate(
            { email: decode.email },
            { verifyEmail: true }
          );
          res.json({ message: message.user.verifyAccount, success: true });
        }
      }
    );
  }
);

const signIn = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return next(new AppError(message.user.invalidCredentials, 401));
    }
    let match = bcrypt.compareSync(password, userExists.password);
    if (!match) {
      return next(new AppError(message.user.invalidCredentials, 401));
    }
    userExists.status = status.ONLINE;
    await userExists.save();
    const token = jwt.sign(
      { userId: userExists.id, role: userExists.role },
      "my-secret-key"
    );
    res.status(200).json({
      message: message.user.signInSuccessfully,
      success: true,
      data: token,
    });
  }
);

// const changeUserPassword = catchError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const user = await User.findOne({ email: req.body.email });

//     if (!user || !bcrypt.compareSync(req.body.oldPassword, user.password))
//       return next(new AppError("incorrect email or password ", 404));

//     await User.findOneAndUpdate(
//       { email: req.body.email },
//       { password: req.body.newPassword }
//     );
//     bcrypt.hashSync(req.body.newPassword, 8);
//     const token = jwt.sign({ userId: user.id, role: user.roles }, "S7S");
//     res.status(201).json({
//       message: message.user.signInSuccessfully,
//       success: true,
//       data: token,
//     });
//   }
// );



export { signUp, verifyAccount, signIn };
