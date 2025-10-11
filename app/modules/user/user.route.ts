import { NextFunction, Request, Response, Router } from "express";
import { addPhotoController, blockedUserController, changeStatusUserController, createAdminUserController, createUserController, deletePhotoController, deleteUserController, getAllUserController, getfilteringUserController, getStatusBasedUserController, getSubscriberUserController, getUserByIdController, getUserController, getUserSavedItemsController, saveItemsController, sreachUserByNameController, subscriptionPurchesController, successUserController, updateUserController, updateUserProfileAndCoverController, userStateController, } from "./user.controller";
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
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data)
        next()
    },
    createUserController
)
userRouter.patch(
    '/update-profile-cover/:id',
    upload.fields([{ name: 'profile', maxCount: 1 }, { name: 'cover', maxCount: 1 },]),
    authentication,
    updateUserProfileAndCoverController
)
userRouter.patch(
    '/add-photo/:id',
    upload.single('photoFile'),
    authentication,
    addPhotoController
)
userRouter.post('/create-admin', createAdminUserController)
userRouter.patch('/update-user/:id', authentication, updateUserController)
userRouter.patch('/delete-photo/:id', authentication, deletePhotoController)
userRouter.get('/get-user', authentication, getUserController)
userRouter.get('/get-user-by-id/:id', getUserByIdController)
userRouter.get('/get-all-user', authentication, getAllUserController)
userRouter.get('/get-filtering-user', authentication, getfilteringUserController)
userRouter.get('/get-search-user', authentication, sreachUserByNameController)
userRouter.get('/get-success-user', successUserController)
userRouter.get('/get-user-state', userStateController)
userRouter.get('/get-status-based-user', authentication, getStatusBasedUserController)
userRouter.get('/get-saveItem', authentication, getUserSavedItemsController)
userRouter.get('/get-subscriber-user', authentication, getSubscriberUserController)
userRouter.patch('/delete-user/:id', authentication, deleteUserController)
userRouter.patch('/change-status/:id', authentication, changeStatusUserController)
userRouter.patch('/saveItem', authentication, saveItemsController)
userRouter.patch('/update-userSubcription-feild/:userId', authentication, subscriptionPurchesController)
userRouter.patch('/block-user/:userId', authentication, blockedUserController)