import { Router } from "express";
import { adminSignInController, forgetPasswordController, signInController, updatePasswordController } from "./auth.controller";
import { sendOtp } from "../../middleware/sendOtp";

export const authRoute = Router()

authRoute.post('/sign-in', signInController)
authRoute.post('/admin-sign-in', adminSignInController)
authRoute.post('/forget-password',sendOtp, forgetPasswordController)
authRoute.patch('/update-password', updatePasswordController);
