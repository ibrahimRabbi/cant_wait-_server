import { Router } from "express";
import { createEventController, deleteEventController, getEventController, getSingleEventController, updateEventController } from "./event.controller";
import { authentication } from "../../middleware/authentication";

export const eventRoute = Router()

eventRoute.post('/create-event',authentication,createEventController) 
eventRoute.patch('/update-event/:id',authentication,updateEventController)
eventRoute.patch('/delete-event/:id',authentication,deleteEventController)
eventRoute.get('/get-event', getEventController) 
eventRoute.get('/get-single-event/:eventId', getSingleEventController) 