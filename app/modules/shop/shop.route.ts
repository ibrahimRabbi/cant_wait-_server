import { Router } from "express";
import { addProductController, deleteProductController, getAllProductController, getSingleProductController, updateProductController } from "./shop.controller";

export const shopRoute = Router()

shopRoute.post('/add-product',addProductController)
shopRoute.patch('/update-product/:id',updateProductController)  
shopRoute.patch('/delete-product/:id',deleteProductController)  
shopRoute.get('/get-all-products',getAllProductController)  
shopRoute.get('/get-single-product/:productId',getSingleProductController)  