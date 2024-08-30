import { Router } from "express";
import { createComment } from "./comment.controller";
import { auth } from "../../middleware/auth";
import { systemRoles } from "../../utils/common/enum";


const commentRouter = Router()

commentRouter.post('/' , auth(),createComment)

export default commentRouter