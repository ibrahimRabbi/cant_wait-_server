import { RequestHandler } from "express";
import { catchAsync } from "../../helper/catchAsync";
import status from "http-status";
import { createEventServices, deleteEventServices, updateEventServices } from "./event.services";
import { EventModel } from "./event.model";




export const createEventController: RequestHandler = catchAsync(async (req, res, next) => {

    if (req.user?.role !== 'admin') {
        res.status(status.UNAUTHORIZED).json({
            sucess: false,
            status: status.UNAUTHORIZED,
            message: "You are not authorized to create an event"
        })
    }

    const checkEvent = await EventModel.findOne({
        $and: [
            { name: req.body.name },
            { date: req.body.date },
            { start_time: req.body.start_time }
        ]
    })

    if (checkEvent) {
        throw new Error("this event already exists")
    }

    const productAdded = await createEventServices(req.body)
    if (!productAdded) {
        throw new Error("Failed to create event")
    }

    res.status(status.OK).json({
        sucess: true,
        status: status.OK,
        message: "Product added successfully",
        data: productAdded
    })
})

export const getEventController: RequestHandler = catchAsync(async (req, res, next) => {

    let productAdded;
    if (req.query.upcoming) {
        console.log('hello')
        productAdded = await EventModel.find({ isDeleted: { $ne: true } }).sort('-createdAt').limit(4)
    } else {
        productAdded = await EventModel.find({ isDeleted: { $ne: true } })
    }

    if (!productAdded) {
        throw new Error('faild to get Events')
    }


    res.status(status.OK).json({
        sucess: true,
        status: status.OK,
        message: "Product added successfully",
        data: productAdded
    })
})

export const getSingleEventController: RequestHandler = catchAsync(async (req, res, next) => {
    const productAdded = await EventModel.findById(req.params.eventId)
    if (!productAdded) {
        throw new Error("Event not found")
    }
    res.status(status.OK).json({
        sucess: true,
        status: status.OK,
        message: "Product added successfully",
        data: productAdded
    })
})

export const updateEventController: RequestHandler = catchAsync(async (req, res, next) => {

    if (req.user?.role !== 'admin') {
        res.status(status.UNAUTHORIZED).json({
            sucess: false,
            status: status.UNAUTHORIZED,
            message: "You are not authorized to update an event"
        })
    }


    const productAdded = await updateEventServices(req.params.id, req.body)
    res.status(status.OK).json({
        sucess: true,
        status: status.OK,
        message: "Product added successfully",
        data: productAdded
    })
})


export const deleteEventController: RequestHandler = catchAsync(async (req, res, next) => {

    if (req.user?.role !== 'admin') {
        res.status(status.UNAUTHORIZED).json({
            sucess: false,
            status: status.UNAUTHORIZED,
            message: "You are not authorized to delete event"
        })
    }


    const productAdded = await deleteEventServices(req.params.id)
    res.status(status.OK).json({
        sucess: true,
        status: status.OK,
        message: "Product added successfully",
        data: productAdded
    })
})
