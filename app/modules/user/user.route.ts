import { Router } from "express";
import { createAdminUserController, createUserController, updateUserController,} from "./user.controller";
 

export const userRouter = Router()

userRouter.post('/create-user', createUserController)
userRouter.post('/create-admin', createAdminUserController)
userRouter.patch('/update-user/:id', updateUserController)