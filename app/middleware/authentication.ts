import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import jwt from 'jsonwebtoken';
import { userModel } from "../modules/user/user.model";
import { envData } from "../config/envData";


export const authentication = async (req: Request, res: Response, next: NextFunction) => {
   
    try {
        const token = req.headers.authorization?.split(' ')[1];
       
        if (!token) {
            throw new Error('unauthorized user');
        }

        const decodeUser = jwt.verify(token as string, envData.secretKey as string)

        if (!decodeUser) {
            throw new Error('unauthorized user')
        }

        const findUser = await userModel.findOne({ email: (decodeUser as JwtPayload).email })
        if (!findUser) {
            throw new Error('unauthorized user')
        }
        req.user = findUser
        next()

    } catch (err: any) {
        next(err);
    }
}