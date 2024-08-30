import { NextFunction, Request, Response } from "express";
import { catchError } from "../../middleware/catchError";
import { message } from "../../utils/common/messages";
import { AppError } from "../../utils/AppError";
import { Post } from "../../../database/models/post.model";

const addPost = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = new Post(req.body);
    await (await post).save();
    res.status(201).json({ message: "Success", post });
  }
);

const getAllPosts = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await Post.find().populate('addedBy');
    res.status(200).json({ message: "Success", post });
  }
);

const getPost = catchError(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate('addedBy');
  post || next(new AppError("Post Not Found", 404));
  !post || res.status(200).json({ message: "Success", post });
});

const deletePost = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await Post.findByIdAndDelete(req.params.id);
    if (!posts) {
      return next(new AppError("Post Not Found", 404));
    }
    res.status(200).json({ message: "Post Deleted Successfully", posts });
  }
);

const updatePost = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!posts) {
      return next(new AppError("Post Not Found", 404));
    }
    res.status(200).json({ message: "Post Updated Successfully", posts });
  }
);

export { getAllPosts, deletePost, updatePost, getPost, addPost };
