import { RequestHandler } from "express";
import { reviewModel } from "./review.model";
import status from "http-status";
import { catchAsync } from "../../helper/catchAsync";


export const createReviewController: RequestHandler = catchAsync(async (req, res, next) => {
    
    const checkExistancy = await reviewModel.findOne({ $and: [{ message: req.body.message }, {userId:req.user._id}] })
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

export const getAllReviewController : RequestHandler = catchAsync(async (req,res , next)=>{

     if (req.user?.role !== 'admin') {
        res.status(status.UNAUTHORIZED).json({
            sucess: false,
            status: status.UNAUTHORIZED,
            message: "You are not authorized to retrive Reviews"
        })
    }


    const getting = await reviewModel.find({})
    if(!getting){
        throw new Error('faild to get reviews')
    }

     res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "review retrive successfully",
        data: getting
    });
    
})

export const getApprovedReviewController : RequestHandler = catchAsync(async (req,res , next)=>{


    const getting = await reviewModel.find({isApproved:'approve'}).populate('userId')
    if(!getting){
        throw new Error('faild to get reviews')
    }

     res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "review retrive successfully",
        data: getting
    });
    
})

