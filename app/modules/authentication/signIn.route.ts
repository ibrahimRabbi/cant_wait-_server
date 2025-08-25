import { Router } from "express";
import { getUserController, signInController } from "./signIn.controller";
import { authentication } from "../../middleware/authentication";

export const authRoute = Router()

authRoute.post('/sign-in', signInController)

authRoute.get('/get-user', authentication, getUserController)