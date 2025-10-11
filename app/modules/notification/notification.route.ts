import { Router } from "express";
import { getUserNotificationController, sendNotificationController } from "./notification.controller";
import { authentication } from "../../middleware/authentication";

export const notificatonRoute = Router()

// notificatonRoute.post('/send', sendNotificationController)
notificatonRoute.get('/get-notification', authentication, getUserNotificationController)