import { Router } from "express";
import { createOrderController } from "./order.controller";
import { authentication } from "../../middleware/authentication";


export const orderRoute = Router()


orderRoute.post('/create-order', authentication, createOrderController)