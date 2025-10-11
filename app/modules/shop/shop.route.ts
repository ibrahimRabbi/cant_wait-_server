import { NextFunction, Request, Response, Router } from "express";
import { addProductController, addReviewProductController, deleteProductController, getAllProductController, getSingleProductController, updateProductController } from "./shop.controller";
import { authentication } from "../../middleware/authentication";
import { upload } from "../../helper/filePerser";

export const shopRoute = Router()

shopRoute.post(
    '/add-product',
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data)
        next()
    },
    authentication,
    addProductController
)

shopRoute.patch(
    '/update-product/:id',
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data)
        next()
    },
    authentication,
    updateProductController
)
shopRoute.patch('/delete-product/:id', authentication, deleteProductController)
shopRoute.patch('/add-review/:productId', authentication, addReviewProductController)

shopRoute.get('/get-all-products', getAllProductController)
shopRoute.get('/get-single-product/:productId', getSingleProductController)

