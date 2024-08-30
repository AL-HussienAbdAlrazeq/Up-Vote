
import { NextFunction, Request, Response } from "express";
import { catchError } from "../../middleware/catchError";
import { Post } from "../../../database/models/post.model";
import { AppError } from "../../utils/AppError";
import { Comment } from "../../../database/models/comment.model";
import { message } from "../../utils/common/messages";

const createComment = catchError(async(req: any, res: Response, next: NextFunction)=>{
    const {content , postId}=req.body
    const{_id} = req.user
    const{language} = req.query
    const post = await Post.findById(postId)
    if(!post) return next(new AppError(message.arabic.PostNotFound, 404))
    const comment = await Comment.create({content , postId , addedBy:_id})
    res.status(200).json({message:"Comment added successfully" , comment})
})




export{
    createComment
}