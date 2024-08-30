import { Router } from "express";
import {  signIn, signUp, verifyAccount } from "./auth.controller";
import { checkEmail } from "../../middleware/checkEmail";
import { validation } from "../../middleware/validation";
import { signInValidation, signUpValidation } from "./auth.validation";

const authRouter = Router()

authRouter.post('/signup' , validation(signUpValidation),checkEmail ,signUp)
authRouter.get('/verify-account/:token' , verifyAccount)
authRouter.post('/signin' , validation(signInValidation),signIn)
// authRouter.patch('/change-password' , changeUserPassword)




export default authRouter