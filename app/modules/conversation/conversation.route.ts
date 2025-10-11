import { Router } from "express";
import { getAllActiveUserController, getAllConversationController } from "./conversation.controller";
import { authentication } from "../../middleware/authentication";

export const conversationRoute = Router()

conversationRoute.get('/get-conversation', getAllConversationController)
conversationRoute.get('/get-active-user', authentication, getAllActiveUserController)