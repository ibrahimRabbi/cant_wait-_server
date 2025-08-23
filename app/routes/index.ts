import { Router } from "express";
import { userRouter } from "../modules/user/user.route";


export const router = Router()


router.use('/user', userRouter)