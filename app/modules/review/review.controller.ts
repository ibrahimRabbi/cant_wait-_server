import { RequestHandler } from "express";
import { reviewModel } from "./review.model";
import status from "http-status";
import { catchAsync } from "../../helper/catchAsync";


export const createReviewController: RequestHandler = catchAsync(async (req, res, next) => {

    const checkExistancy = await reviewModel.findOne({ $and: [{ message: req.body.message }, { userId: req.user._id }] })
    if (checkExistancy) {
        throw new Error('this review already exist')
    }

    req.body.userId = req.user._id
    const creating = await reviewModel.create(req.body)
    console.log(creating)
    if (!creating) {
        throw new Error('faild to create review')
    }

    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "review created successfully",
        data: creating
    });
})

export const getAllReviewController: RequestHandler = catchAsync(async (req, res, next) => {
    const pageNumber: number = parseInt(req?.query?.page as string)
    const limitValue: number = parseInt(req.query?.limit as string)
    const skipValue = (pageNumber - 1) * limitValue

    if (req.user?.role !== 'admin') {
        res.status(status.UNAUTHORIZED).json({
            sucess: false,
            status: status.UNAUTHORIZED,
            message: "You are not authorized to retrive Reviews"
        })
    }


    const getting = await reviewModel.find({ isDeleted: { $ne: true } }).populate('userId').skip(skipValue).limit(limitValue).sort({ createdAt: -1 })
    const totalData = await reviewModel.countDocuments({ isDeleted: { $ne: true } })

    if (!getting) {
        throw new Error('faild to get reviews')
    }

    res.status(status.OK).json({
        success: true,
        status: status.OK,
        meta: {
            totalData: totalData,
            limit: req.query.limit,
            pageNumber: req.query.page
        },
        message: "review retrive successfully",
        data: getting
    });

})

export const getSingleReviewController: RequestHandler = catchAsync(async (req, res, next) => {
    if (req.user?.role !== 'admin') {
        res.status(status.UNAUTHORIZED).json({
            sucess: false,
            status: status.UNAUTHORIZED,
            message: "You are not authorized to retrive Reviews"
        })
    }

    const getting = await reviewModel.findById(req?.params?.id).populate('userId')

    if (!getting) {
        throw new Error('faild to get reviews')
    }

    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "review retrive successfully",
        data: getting
    });

})

export const getApprovedReviewController: RequestHandler = catchAsync(async (req, res, next) => {

    const getting = await reviewModel.find({ isApproved: { $eq: true }, isDeleted: { $ne: true } }).populate('userId')
    if (!getting) {
        throw new Error('faild to get reviews')
    }

    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "review retrive successfully",
        data: getting
    });

})

export const deleteReviewController: RequestHandler = catchAsync(async (req, res, next) => {

    const deleted = await reviewModel.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true, runValidators: true, context: 'query' })
    if (!deleted) {
        throw new Error('faild to deleted reviews')
    }

    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "review deleted successfully",
        data: deleted
    });

})

export const updateReviewController: RequestHandler = catchAsync(async (req, res, next) => {
 
    const deleted = await reviewModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, context: 'query' })
    if (!deleted) {
        throw new Error('faild to deleted reviews')
    }

    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "review deleted successfully",
        data: deleted
    });

})

