import { Router } from "express";
import { createOrderController, getAllOrderController, getMyGiftController, getOrderByIdController, getOrderController, updateOrderController } from "./order.controller";
import { authentication } from "../../middleware/authentication";


export const orderRoute = Router()


orderRoute.post('/create-order', authentication, createOrderController)
orderRoute.get('/get-all-order', authentication, getAllOrderController)
orderRoute.get('/get-order', authentication, getOrderController)
orderRoute.get('/get-order-by-id/:id', authentication, getOrderByIdController)
orderRoute.patch('/update-order/:id', authentication, updateOrderController)
orderRoute.get('/my-gift/:id', getMyGiftController)