import { RequestHandler } from "express";
import { catchAsync } from "../../helper/catchAsync";
import { signInService } from "./signIn.service";
import status from "http-status";
import { userModel } from "../user/user.model";



export const signInController: RequestHandler = catchAsync(async (req, res, next) => {

    const signin = await signInService(req.body);
    
    res.status(status.OK).json({
        success: true,
        code: status.OK,
        message: "sign in successfully",
        token: signin
    });

})


export const forgetPasswordController: RequestHandler = catchAsync(async (req, res, next) => {

    res.status(status.OK).json({
        success: true,
        code: status.OK,
        message: "we sent email verification code to your email",
        data: {
            email: req.body.email,
            otp: req.otpCode
        }
    });

})


export const updatePasswordController :RequestHandler = catchAsync(async (req,res,next) => {

    const updating = await userModel.findOneAndUpdate(
        { email: req.query.email },
        { password: req.body.newPassword },
       { new: true, runValidators: true, context: 'query' });
    if (!updating) {
        return next(new Error("User not found or unable to update password"));
    }
    res.status(status.OK).json({
        success: true,
        code: status.OK,
        message: "password updated successfully",
        otp: updating
    });
})

