import { RequestHandler } from "express";
import status from "http-status";
import { OrderModel } from "./order.model";

export const createOrderController: RequestHandler = async (req, res, next) => {

    //    if(req.user?.role !== 'admin'){
    //     res.status(status.UNAUTHORIZED).json({
    //         sucess:false,
    //         status:status.UNAUTHORIZED,
    //         message:"You are not authorized to add product"
    //     })
    // }

    req.body.senderId = req.user._id

    const creatingOrder = await OrderModel.create(req.body)
    if (!creatingOrder) {
        throw new Error('faild to create order')
    }

    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "order created successfully",
        user: creatingOrder
    });
    
}