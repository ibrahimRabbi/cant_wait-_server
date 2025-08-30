import { Router } from "express";
import { addProductController, deleteProductController, getAllProductController, getSingleProductController, updateProductController } from "./shop.controller";
import { authentication } from "../../middleware/authentication";

export const shopRoute = Router()

shopRoute.post('/add-product', authentication, addProductController)
shopRoute.patch('/update-product/:id', authentication, updateProductController)  
shopRoute.patch('/delete-product/:id', authentication, deleteProductController)  
shopRoute.get('/get-all-products',getAllProductController)  
shopRoute.get('/get-single-product/:productId',getSingleProductController)  