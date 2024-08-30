import { NextFunction, Request, Response } from "express";

export const globalError = (
  err: { statusCode: number; message: string },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let code = err.statusCode || 500;
  res.status(code).json({ error: "error", message: err.message, code });
};
