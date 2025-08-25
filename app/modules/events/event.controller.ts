import { RequestHandler } from "express";
import { catchAsync } from "../../helper/catchAsync";
import status from "http-status";
import { createEventServices } from "./event.services";
import { EventModel } from "./event.model";

export const createEventController: RequestHandler = catchAsync(async (req, res, next) => {
    if(req.user.role !== "admin"){
        throw new Error("unauthorized user")
    }
const productAdded = await createEventServices(req.body)
    res.status(status.OK).json({
        sucess:true,
        status:status.OK,
        message:"Product added successfully",
        data:productAdded
    })
})


export const getEventController: RequestHandler = catchAsync(async (req, res, next) => {
const productAdded = await EventModel.find({isDeleted:{$ne:true}})
    res.status(status.OK).json({
        sucess:true,
        status:status.OK,
        message:"Product added successfully",
        data:productAdded
    })
})