import { RequestHandler } from "express";
import status from "http-status";
import { OrderModel } from "./order.model";
import { catchAsync } from "../../helper/catchAsync";

export const createOrderController: RequestHandler = catchAsync(async (req, res, next) => {
    
    req.body.senderId = req.user._id

    const creatingOrder = await OrderModel.create(req.body)
    if (!creatingOrder) {
        throw new Error('faild to create order')
    }

    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "order created successfully",
        data: creatingOrder
    });
    
}
)

export const getOrderController: RequestHandler = catchAsync(async (req, res, next) => {
    
  const findOrders = await OrderModel.find({senderId:req.user?._id}).populate('productId').populate('reciverId')
  if(!findOrders){
    throw new Error('faild to get order data')
  }

    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "order created successfully",
        data: findOrders
    });
    
})