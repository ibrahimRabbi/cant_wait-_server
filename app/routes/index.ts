import { Router } from "express";
import { userRouter } from "../modules/user/user.route";
import { authRoute } from "../modules/authentication/auth.route";
import { shopRoute } from "../modules/shop/shop.route";
import { eventRoute } from "../modules/events/event.route";
import { subscriptionRoute } from "../modules/subscription/subs.route";
import { orderRoute } from "../modules/order/order.route";

export const router = Router()

router.use('/user', userRouter)
router.use('/auth', authRoute)
router.use('/shop', shopRoute)
router.use('/event', eventRoute)
router.use('/subscription', subscriptionRoute) 
router.use('/order', orderRoute)