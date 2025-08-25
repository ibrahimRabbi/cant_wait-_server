import { Router } from "express";
import { userRouter } from "../modules/user/user.route";
import { authRoute } from "../modules/authentication/signIn.route";
import { shopRoute } from "../modules/shop/shop.route";
import { eventRoute } from "../modules/events/event.route";


export const router = Router()


router.use('/user', userRouter)
router.use('/auth', authRoute)
router.use('/shop', shopRoute)
router.use('/event', eventRoute)