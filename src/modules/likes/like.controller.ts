import { NextFunction, Request, Response } from "express";

import { catchError } from "../../middleware/catchError";
import { Comment } from "../../../database/models/comment.model";
import { Post } from "../../../database/models/post.model";
import { AppError } from "../../utils/AppError";
import { Like } from "../../../database/models/likes.model";
import mongoose from "mongoose";

export const likeOrUnLike = catchError(
  async (req: any, res: Response, next: NextFunction) => {
    const modelId = req.params.id;
    const { model } = req.body;
    const userId = req.user._id;

    const modelDB: any = model.toLowerCase() == "comment" ? Comment : Post;
    const isModelExist = await modelDB.findById(modelId);
    if (!isModelExist) {
      return next(new AppError("ID Not Found", 404));
    }

    const isLiked = await Like.findOne({ likedBy: userId, likeOn: modelId });
    if (isLiked) {
      await isLiked.deleteOne();
      isModelExist.numberOfLikes--;
      await isModelExist.save();
      return res.status(200).json({ message: "Unlike Successfully" });
    }

    const like = await Like.create({
      likedBy: new mongoose.Types.ObjectId(userId),
      likeOn: new mongoose.Types.ObjectId(modelId),
      model
    });
    isModelExist.numberOfLikes++;
    await isModelExist.save();
    return res.status(200).json({ message: "Like Created Successfully" });
  }
);
