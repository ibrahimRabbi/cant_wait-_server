import { Router } from "express";
import { sendOtp } from "../../middleware/sendOtp";
import { createOtpController, verifyOtpController } from "./otp.controller";

export const otpRoute = Router()

otpRoute.post('/send-otp',sendOtp, createOtpController)
otpRoute.post('/verify-otp', verifyOtpController)