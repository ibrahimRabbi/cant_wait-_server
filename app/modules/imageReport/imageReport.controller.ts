import { Request, RequestHandler } from "express";
import { imageReportModel } from "./imageReport.model";
import status from "http-status";
import { catchAsync } from "../../helper/catchAsync";
import { userModel } from "../user/user.model";

export const imageReportController: RequestHandler = catchAsync(async (req, res, next) => {
   
    const createing = await imageReportModel.create(req.body)
    if (!createing) {
        throw new Error("Failed to report usert")
    }
    res.status(status.OK).json({
        sucess: true,
        status: status.OK,
        message: "Report Submitted",
        data: createing
    })
})


export const getImageReportController: RequestHandler = catchAsync(async (req, res, next) => {

    if (req.user?.role !== 'admin') {
        res.status(status.UNAUTHORIZED).json({
            sucess: false,
            status: status.UNAUTHORIZED,
            message: "You are not authorized to get reports"
        })
    }

    const createing = await imageReportModel.find({status:'pending'}).populate('userId').populate('reporterId')
    if (!createing) {
        throw new Error("Failed to get report")
    }
    res.status(status.OK).json({
        sucess: true,
        status: status.OK,
        message: "Report retrived",
        data: createing
    })
})


export const getSingleImageReportController: RequestHandler = catchAsync(async (req, res, next) => {

    if (req.user?.role !== 'admin') {
        res.status(status.UNAUTHORIZED).json({
            sucess: false,
            status: status.UNAUTHORIZED,
            message: "You are not authorized to get reports"
        })
    }


    const createing = await imageReportModel.findById(req?.params.reportId).populate('userId').populate('reporterId')
    if (!createing) {
        throw new Error("Failed to get report")
    }
    res.status(status.OK).json({
        sucess: true,
        status: status.OK,
        message: "Report retrived",
        data: createing
    })
})


export const changeStatusAndDeleteReportUserController: RequestHandler = catchAsync(async (req, res, next) => {

    if (req.user?.role !== 'admin') {
        res.status(status.UNAUTHORIZED).json({
            sucess: false,
            status: status.UNAUTHORIZED,
            message: "You are not authorized to change user status"
        })
    }

    const value = {
        banExpiresAt: new Date(Date.now() + (req.body.duration || 3) * 24 * 60 * 60 * 1000),
        status: 'banned',
    }


    const user = await userModel.findByIdAndUpdate(req.params.id, value, { new: true, runValidators: true, context: 'query' });
    if (!user) {
        throw new Error("faild to change status")
    }

    const changeReportStatus = await imageReportModel.findByIdAndUpdate(req.body.reportId, { status: 'approved' }, { new: true, runValidators: true, context: 'query' });

    if (!changeReportStatus) {
        throw new Error("faild to change status")
    }
    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "user status changed successfully",
        user: user
    });


})