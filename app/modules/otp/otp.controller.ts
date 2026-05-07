import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../helper/catchAsync";
import { OtpModel } from "./otp.model";
import status from "http-status";




export const createOtpController = catchAsync(async (req: Request, res: Response, NextFunction: NextFunction) => {
  // const otp = Math.floor(100000 + Math.random() * 900000).toString();


  const createdOtp = await OtpModel.create({
    email: req?.body?.email,
    otp: req.otpCode,
    expiresAt: new Date(Date.now() + 2 * 60 * 1000), // 2 mins
  });

  res.status(status.OK).json({
    success: true,
    status: status.OK,
    message: "we have sent email verification code to your email",
    data: createdOtp
  });


}
)


export const verifyOtpController = catchAsync(async (req: Request, res: Response, NextFunction: NextFunction) => {
  
  const record = await OtpModel.findOne({ email: req?.body?.email });
  if (!record) {
    throw new Error('OTP not found')
  }

  if (record.expiresAt.getTime() < Date.now()) {
    await OtpModel.deleteOne({ email: req?.body?.email });
    throw new Error('OTP expired');
  }


  if (parseInt(req?.body?.otp) !== record.otp) {
    throw new Error('Invalid OTP');
  }

 
  await OtpModel.deleteOne({ email: req?.body?.email })
 

  res.status(status.OK).json({
    success: true,
    status: status.OK,
    message: 'OTP verified successfully',
    data:  ''
  });

}
)