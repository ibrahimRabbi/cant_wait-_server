import { RequestHandler } from "express";
import { createSubcriptionService } from "./subs.service";
import status from "http-status";
import { SubscriptionModel } from "./subs.model";
import { catchAsync } from "../../helper/catchAsync";

export const createSubcriptionController: RequestHandler = async (req, res, next) => {

    if (req.user?.role !== 'admin') {
        res.status(status.UNAUTHORIZED).json({
            sucess: false,
            status: status.UNAUTHORIZED,
            message: "You are not authorized to add product"
        })
    }

    const createdSub = await createSubcriptionService(req.body)
    res.status(200).json({
        success: true,
        status: status.OK,
        message: 'Subscription created successfully',
        data: createdSub
    })

}


export const getAllSubscriptionController: RequestHandler = catchAsync(async (req, res, next) => {
    const allSub = await SubscriptionModel.find({ isDeleted: { $ne: true } })
    if (!allSub) {
        throw new Error('faild to get subscription')
    }
    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: 'All subscription fetched successfully',
        data: allSub
    });
})

export const getSingleSubscriptionController: RequestHandler = async (req, res, next) => {
    const { id } = req.params
    const singleSub = await SubscriptionModel.findById(id)
    if (!singleSub) {
        throw new Error('No subscription found')
    }

    res.status(200).json({
        success: true,
        status: 200,
        message: 'subscription retrive successfully',
        data: singleSub
    })
}


export const deleteSubscriptionController: RequestHandler = async (req, res, next) => {
    if (req.user?.role !== 'admin') {
        res.status(status.UNAUTHORIZED).json({
            sucess: false,
            status: status.UNAUTHORIZED,
            message: "You are not authorized to delete subscription"
        })
    }
    const { id } = req.params
    const deletedSub = await SubscriptionModel.findByIdAndDelete(id, { new: true })
    if (!deletedSub) {
        throw new Error('No subscription found')
    }
    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: 'subscription deleted successfully',
        data: deletedSub
    });
}

export const updateSubscriptionController: RequestHandler = async (req, res, next) => {
    if (req.user?.role !== 'admin') {
        res.status(status.UNAUTHORIZED).json({
            sucess: false,
            status: status.UNAUTHORIZED,
            message: "You are not authorized to update subscription"
        })
    }
    const { id } = req.params
    const updatedSub = await SubscriptionModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true, strict: "throw" })
    if (!updatedSub) {
        throw new Error('No subscription found')
    }
    res.status(200).json({
        success : true,
        status: 200,
        message: 'subscription updated successfully',
        data: updatedSub
    })
}
