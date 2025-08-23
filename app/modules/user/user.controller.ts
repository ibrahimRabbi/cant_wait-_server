import { RequestHandler, response } from "express";
import { userModel } from "./user.model";

export const createUserController: RequestHandler = async (req, res, next) => {
    const creating = await userModel.create(req.body)
    res.status(200).json({
        success: true,
        status: 200,
        response: creating
    })
}