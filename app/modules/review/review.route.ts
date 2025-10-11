import { Router } from "express";
import { createReviewController, deleteReviewController, getAllReviewController, getApprovedReviewController, getSingleReviewController, updateReviewController } from "./review.controller";
import { authentication } from "../../middleware/authentication";

export const reviewRoute = Router()

reviewRoute.post('/create-review', authentication, createReviewController)
reviewRoute.get('/get-all-review', authentication, getAllReviewController)
reviewRoute.get('/get-review', getApprovedReviewController)
reviewRoute.patch('/delete-reviews/:id', authentication, deleteReviewController)
reviewRoute.get('/single-reviews/:id', authentication, getSingleReviewController)
reviewRoute.patch('/update-reviews/:id', authentication, updateReviewController)