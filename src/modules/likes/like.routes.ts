import { Router } from "express";
import { auth } from "../../middleware/auth";
import { likeOrUnLike } from "./like.controller";



const likeRouter = Router()

likeRouter.post('/:id' , auth() ,likeOrUnLike)

export default likeRouter