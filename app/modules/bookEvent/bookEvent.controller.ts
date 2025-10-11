import { RequestHandler } from "express";
import { bookEventModel } from "./book.model";
import status from "http-status";
import { catchAsync } from "../../helper/catchAsync";

export const bookEventController: RequestHandler = catchAsync(async (req, res, next) => {

    req.body.userId = req.user._id

    const checkBefore = await bookEventModel.findOne({
        $and: [
            { userId: req.user._id },
            { eventId: req.body.eventId }
        ]
    })

    if (checkBefore) {
        throw new Error('this event Already Booked')
    }
    const booking = await bookEventModel.create(req.body)
    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "event booked successfully",
        data: booking
    });
})

export const getBookEventController: RequestHandler = catchAsync(async (req, res, next) => {

    const bookevents = await bookEventModel.find({isDeleted: {$ne:true}}).populate('eventId').populate('userId')

    if (!bookevents) {
        throw new Error('failed to fetch booked event')
    }
   
    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "book event retrieved successfully",
        data: bookevents
    });
})