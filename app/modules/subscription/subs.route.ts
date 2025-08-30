import { Router } from "express";
import { createSubcriptionController, deleteSubscriptionController, getAllSubscriptionController, getSingleSubscriptionController, updateSubscriptionController } from "./subs.controller";
import { authentication } from "../../middleware/authentication";



export const subscriptionRoute = Router()


subscriptionRoute.post('/create-subcription', authentication, createSubcriptionController)
subscriptionRoute.delete('/delete-subcription/:id', authentication, deleteSubscriptionController)
subscriptionRoute.patch('/update-subcription/:id', authentication, updateSubscriptionController)
subscriptionRoute.get('/all-subcription', getAllSubscriptionController)
subscriptionRoute.get('/single-subcription/:id', getSingleSubscriptionController)
