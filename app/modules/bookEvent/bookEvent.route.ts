import { Router } from "express";
import { bookEventController } from "./bookEvent.controller";
import { authentication } from "../../middleware/authentication";

export const bookEventRoute = Router()


bookEventRoute.post('/create-book-event', authentication, bookEventController)