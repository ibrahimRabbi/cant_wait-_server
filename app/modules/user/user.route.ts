import { Router } from "express";
import { createAdminUserController, createUserController, deleteUserController, getAllUserController, getfilteringUserController, getUserByIdController, getUserController, updateUserController,} from "./user.controller";
import { authentication } from "../../middleware/authentication";
 

export const userRouter = Router()

userRouter.post('/create-user', createUserController)
userRouter.post('/create-admin', createAdminUserController)
userRouter.patch('/update-user/:id', updateUserController)
userRouter.get('/get-user', authentication, getUserController)
userRouter.get('/get-user-by-id/:id', getUserByIdController)
userRouter.get('/get-all-user', authentication, getAllUserController)
userRouter.get('/get-narrow-user', authentication, getfilteringUserController)
userRouter.patch('/delete-user/:id', authentication, deleteUserController)