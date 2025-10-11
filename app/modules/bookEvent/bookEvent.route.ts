import { Router } from "express";
import { bookEventController, getBookEventController } from "./bookEvent.controller";
import { authentication } from "../../middleware/authentication";

export const bookEventRoute = Router()


bookEventRoute.post('/create-book-event', authentication, bookEventController)
bookEventRoute.get('/get-book-event', authentication, getBookEventController)