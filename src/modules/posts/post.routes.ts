import { Router } from "express";

import { validation } from "../../middleware/validation";
import { addPostValidation, updatePostValidation } from "./post.validation";
import { addPost, deletePost, getAllPosts, getPost, updatePost } from "./post.controller";
import { auth } from "../../middleware/auth";
import { systemRoles } from "../../utils/common/enum";




const postRouter = Router()

postRouter.post('/' ,auth(), validation(addPostValidation),addPost)
postRouter.get('/' ,auth(),getAllPosts )
postRouter.get('/:id',auth(),getPost)
postRouter.delete('/:id' ,auth(), deletePost)
postRouter.put('/:id' , auth(),validation(updatePostValidation),updatePost)



export default postRouter