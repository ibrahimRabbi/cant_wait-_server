import { Router } from "express";
import { createReviewController, getAllReviewController, getApprovedReviewController } from "./review.controller";
import { authentication } from "../../middleware/authentication";

export const reviewRoute = Router()

reviewRoute.post('/create-review', authentication, createReviewController)
reviewRoute.get('/get-all-review', authentication, getAllReviewController)
reviewRoute.get('/get-review', getApprovedReviewController)