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

export const getOrderByIdController: RequestHandler = catchAsync(async (req, res, next) => {
 
    // if (req.user?.role !== 'admin') {
    //     res.status(status.UNAUTHORIZED).json({
    //         sucess: false,
    //         status: status.UNAUTHORIZED,
    //         message: "You are not authorized to update product"
    //     })
    // }

    const findOrders = await OrderModel.findById(req?.params?.id).populate('productId').populate('reciverId').populate('senderId')
    if (!findOrders) {
        throw new Error('faild to get order data')
    }

    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "order retrived successfully",
        data: findOrders
    });

})

export const updateOrderController: RequestHandler = catchAsync(async (req, res, next) => {

    if (req.user?.role !== 'admin') {
        res.status(status.UNAUTHORIZED).json({
            sucess: false,
            status: status.UNAUTHORIZED,
            message: "You are not authorized to update order status"
        })
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(req?.params?.id, req.body, { new: true, runValidators: true, context: 'query' })
    if (!updatedOrder) {
        throw new Error('faild to update order')
    }

    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "order status updated successfully",
        data: updatedOrder
    });

})

export const getOrderController: RequestHandler = catchAsync(async (req, res, next) => {

    const findOrders = await OrderModel.find({ senderId: req.user?._id }).populate('productId').populate('reciverId')
    if (!findOrders) {
        throw new Error('faild to get order data')
    }

    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "order created successfully",
        data: findOrders
    });

})

export const getAllOrderController: RequestHandler = catchAsync(async (req, res, next) => {
    const pageNumber: number = parseInt(req?.query?.page as string)
    const limitValue: number = parseInt(req.query?.limit as string)
    const skipValue = (pageNumber - 1) * limitValue
    const query: any = { isDeleted: { $ne: true } };

    if (req.query.orderStatus) {
        query.orderStatus = req.query.orderStatus;
    }
    if (req.user?.role !== 'admin') {
        res.status(status.UNAUTHORIZED).json({
            sucess: false,
            status: status.UNAUTHORIZED,
            message: "You are not authorized to update product"
        })
    }

    const findOrders = await OrderModel.find(query).populate('productId').populate('reciverId').populate('senderId').skip(skipValue).limit(limitValue)
    const totalData = await OrderModel.countDocuments({ isDeleted: { $ne: true } })
    if (!findOrders) {
        throw new Error('faild to get order data')
    }

    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "order created successfully",
        meta: {
            totalData: totalData,
            limit: req.query.limit,
            pageNumber: req.query.page
        },
        data: findOrders
    });

})


export const getMyGiftController: RequestHandler = catchAsync(async (req, res, next) => {
    

    const findOrders = await OrderModel.find({reciverId:req?.params?.id}).populate('senderId').populate('productId') 
     
    if (!findOrders) {
        throw new Error('faild to get my gifts')
    }

    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "gift retrived successfully",
        data: findOrders
    });

})