import  bcrypt  from 'bcrypt';

import { User } from "../../database/models/user.model"
import { NextFunction, Request, Response } from "express"
import { AppError } from "../utils/AppError"
import { message } from "../utils/common/messages"

const checkEmail=async (req:Request , res:Response , next : NextFunction)=>{
    const isFound = await User.findOne({email:req.body.email})
    if(isFound) {
        return next(new AppError(message.user.userAlreadyExist,409))
    }
    req.body.password = bcrypt.hashSync(req.body.password , 8)
    next()
}

export{
    checkEmail
}