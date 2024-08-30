import { Router } from "express";
import { addUser, deleteUser, getAllUsers, getUser, updateUser } from "./user.controller";

import { validation } from "../../middleware/validation";

import { addUserValidation, updateUserValidation } from "./user.validation";
import { systemRoles } from "../../utils/common/enum";
import { auth } from "../../middleware/auth";




const userRouter = Router()

userRouter.post('/' ,auth([systemRoles.ADMIN]),validation(addUserValidation), addUser)
userRouter.get('/' ,getAllUsers )
userRouter.get('/:id',getUser)
userRouter.delete('/:id' ,auth([systemRoles.ADMIN]), deleteUser)
userRouter.put('/:id' , auth([systemRoles.ADMIN]),validation(updateUserValidation),updateUser)



export default userRouter