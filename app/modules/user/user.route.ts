import { NextFunction, Request, Response, Router } from "express";
import { createAdminUserController, createUserController, deleteUserController, getAllUserController, getfilteringUserController, getUserByIdController, getUserController, getUserSavedItemsController, saveItemsController, sreachUserByNameController, successUserController, updateUserController, } from "./user.controller";
import { authentication } from "../../middleware/authentication";
import { upload } from "../../helper/filePerser";


export const userRouter = Router()

userRouter.post(
    '/create-user',
    
   upload.fields([
        { name: 'profile', maxCount: 1 },
        { name: 'document', maxCount: 1 },
        { name: 'document1', maxCount: 1 },
        { name: 'document2', maxCount: 1 }
    ]),
    (req: Request, res: Response, next:NextFunction) => {
        req.body = JSON.parse(req.body.data)
        next()
    },
    createUserController
)
userRouter.post('/create-admin', createAdminUserController)
userRouter.patch('/update-user/:id', updateUserController)
userRouter.get('/get-user', authentication, getUserController)
userRouter.get('/get-user-by-id/:id', getUserByIdController)
userRouter.get('/get-all-user', authentication, getAllUserController)
userRouter.get('/get-filtering-user', authentication, getfilteringUserController)
userRouter.get('/get-search-user', authentication, sreachUserByNameController)
userRouter.get('/get-success-user', successUserController)
userRouter.patch('/delete-user/:id', authentication, deleteUserController)
userRouter.patch('/saveItem', authentication, saveItemsController)
userRouter.get('/get-saveItem', authentication, getUserSavedItemsController)