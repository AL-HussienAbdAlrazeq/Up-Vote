import {  NextFunction, Request , Response } from "express"

export function catchError(callback: (req: Request, res: Response, next: NextFunction) => Promise<any>){
   return(req:Request,res:Response,next:NextFunction)=>{
     callback(req,res,next).catch((error: string)=>{
       next(error)
     })
   }
}