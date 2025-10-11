import { NextFunction, Request, Response, Router } from "express";
import { createEventController, deleteEventController, getEventController, getSingleEventController, updateEventController } from "./event.controller";
import { authentication } from "../../middleware/authentication";
import { upload } from "../../helper/filePerser";

export const eventRoute = Router()

eventRoute.post(
    '/create-event',
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data)
        next()
    },
    authentication,
    createEventController
)

eventRoute.patch(
    '/update-event/:id',
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data)
        next()
    },
    authentication,
    updateEventController
)
eventRoute.patch('/delete-event/:id', authentication, deleteEventController)
eventRoute.get('/get-event', getEventController)
eventRoute.get('/get-single-event/:eventId', getSingleEventController) 