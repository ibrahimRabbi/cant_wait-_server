import { Router } from "express";
import { createEventController, getEventController } from "./event.controller";
import { authentication } from "../../middleware/authentication";

export const eventRoute = Router()

eventRoute.post('/create-event',authentication, createEventController) 
eventRoute.get('/get-event', getEventController) 