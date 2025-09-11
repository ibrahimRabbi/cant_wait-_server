import { Router } from "express";
import { createOrderController, getOrderController } from "./order.controller";
import { authentication } from "../../middleware/authentication";


export const orderRoute = Router()


orderRoute.post('/create-order', authentication, createOrderController)
orderRoute.get('/get-order', authentication, getOrderController)