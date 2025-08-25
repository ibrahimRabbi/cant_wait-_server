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



export const getUserController: RequestHandler = catchAsync(async (req, res, next) => {

    const user = await userModel.findOne({email: req?.user?.email});
    
    res.status(status.OK).json({
        success: true,
        code: status.OK,
        message: "user Retraive successfully",
        user: user
    });
   

})