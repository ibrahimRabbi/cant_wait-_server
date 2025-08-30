import { RequestHandler } from "express";
import { userModel } from "../modules/user/user.model";
import nodeMailer from "nodemailer";
import status from "http-status";
import { templeteString } from "../helper/emailTemplete";
import { envData } from "../config/envData";


export const sendOtp: RequestHandler = async (req, res, next) => {

    try {

        const OTP = Math.floor(100000 + Math.random() * 900000)
        
        const checkExist = await userModel.findOne({ email: req.body.email });

        if (!checkExist) {
            throw new Error("User not found");
        }

        if (checkExist.isDeleted) {
            throw new Error('unthorized user')
        }


        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: false,
            auth: {
                user: envData.email,
                pass: envData.emailPassword
            }
        })



        const send = await transporter.sendMail({
            from: {
                name: 'Rumblle',
                address: envData.email as string
            },
            to: req.body.email as string,
            subject: 'Rumble email verification code--Sign Up',
            text: '',
            html: templeteString(req.body.email, OTP.toString())
        })

        if (!send.response) {
            throw new Error('something went wrong')
        }

        req.otpCode = OTP;
        next();

    } catch (err: any) {
        next(err)
    }
}