
import { NextFunction, Request, Response } from "express"
import { AppError } from "../utils/AppError"


export const validation = (schema: any)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        let data = {...req.body , ...req.params , ...req.query}
       const {error} =  schema.validate(data,{abortEarly:false})
       if(error){
        let errMsg = error.details.map((err: { message: string })=>{return err.message})
        return next(new AppError(errMsg , 401))
       }
       next()
    }
}