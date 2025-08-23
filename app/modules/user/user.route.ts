import { Router } from "express";
import { createAdminUserController, createFreeTrailUserController,} from "./user.controller";
 

export const userRouter = Router()

userRouter.post('/create-user', createFreeTrailUserController)
userRouter.post('/create-admin', createAdminUserController)

 