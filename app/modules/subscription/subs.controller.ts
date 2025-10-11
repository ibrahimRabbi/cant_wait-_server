import { RequestHandler } from "express";
import { createSubcriptionService } from "./subs.service";
import status from "http-status";
import { SubscriptionModel } from "./subs.model";
import { catchAsync } from "../../helper/catchAsync";

export const createSubcriptionController: RequestHandler = async (req, res, next) => {

    if (req.user?.role !== 'admin') {
        res.status(status.UNAUTHORIZED).json({
            sucess: false,
            status: status.UNAUTHORIZED,
            message: "You are not authorized to add product"
        })
    }

    const createdSub = await createSubcriptionService(req.body)
    res.status(200).json({
        success: true,
        status: status.OK,
        message: 'Subscription created successfully',
        data: createdSub
    })

}

export const getAllSubscriptionController: RequestHandler = catchAsync(async (req, res, next) => {
    const allSub = await SubscriptionModel.find({ isDeleted: { $ne: true } })
    if (!allSub) {
        throw new Error('faild to get subscription')
    }
    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: 'All subscription fetched successfully',
        data: allSub
    });
})

export const getSingleSubscriptionController: RequestHandler = async (req, res, next) => {
    const { id } = req.params
    const singleSub = await SubscriptionModel.findById(id)
    if (!singleSub) {
        throw new Error('No subscription found')
    }

    res.status(200).json({
        success: true,
        status: 200,
        message: 'subscription retrive successfully',
        data: singleSub
    })
}

export const deleteSubscriptionController: RequestHandler = async (req, res, next) => {
    if (req.user?.role !== 'admin') {
        res.status(status.UNAUTHORIZED).json({
            sucess: false,
            status: status.UNAUTHORIZED,
            message: "You are not authorized to delete subscription"
        })
    }
    const { id } = req.params
    const deletedSub = await SubscriptionModel.findByIdAndDelete(id, { new: true })
    if (!deletedSub) {
        throw new Error('No subscription found')
    }
    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: 'subscription deleted successfully',
        data: deletedSub
    });
}

export const updateSubscriptionController: RequestHandler = async (req, res, next) => {
    if (req.user?.role !== 'admin') {
        res.status(status.UNAUTHORIZED).json({
            sucess: false,
            status: status.UNAUTHORIZED,
            message: "You are not authorized to update subscription"
        })
    }
    const { id } = req.params
    const updatedSub = await SubscriptionModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true, strict: "throw" })
    if (!updatedSub) {
        throw new Error('No subscription found')
    }
    res.status(200).json({
        success : true,
        status: 200,
        message: 'subscription updated successfully',
        data: updatedSub
    })
}

// {"pricingPlans": [
//    ,
//     {
//       "id": "standard",
//       "name": "STANDARD",
//       "price": 2999,
//       "currency": "$",
//       "billing": "User / Month",
//       "featured": false,
//       "features": [
//         {
//           "id": "basic_features",
//           "text": "All basic features",
//           "included": true
//         },
//         {
//           "id": "storage_500gb_1",
//           "text": "500 GB storage",
//           "included": true
//         },
//         {
//           "id": "email_support",
//           "text": "Email support",
//           "included": true
//         },
//         {
//           "id": "basic_analytics_1",
//           "text": "Basic analytics",
//           "included": true
//         },
//         {
//           "id": "multiple_devices",
//           "text": "Access on multiple devices",
//           "included": true
//         },
//         {
//           "id": "storage_500gb_2",
//           "text": "500 GB storage",
//           "included": true
//         },
//         {
//           "id": "storage_500gb_3",
//           "text": "500 GB storage",
//           "included": true
//         },
//         {
//           "id": "basic_analytics_2",
//           "text": "Basic analytics",
//           "included": true
//         },
//         {
//           "id": "storage_500gb_4",
//           "text": "500 GB storage",
//           "included": true
//         }
//       ],
//       "buttonText": "BOOK NOW",
//       "buttonAction": "book_standard"
//     },
//     {
//       "id": "trial",
//       "name": "TRIAL",
//       "price": 0,
//       "currency": "$",
//       "billing": "User / Month",
//       "featured": false,
//       "features": [
//         {
//           "id": "basic_features_access",
//           "text": "Access to basic features",
//           "included": true
//         },
//         {
//           "id": "storage_5gb",
//           "text": "5 GB storage",
//           "included": true
//         },
//         {
//           "id": "community_support",
//           "text": "Community support",
//           "included": true
//         },
//         {
//           "id": "single_device",
//           "text": "Single device access",
//           "included": true
//         },
//         {
//           "id": "limited_analytics",
//           "text": "Limited analytics",
//           "included": true
//         }
//       ],
//       "buttonText": "BOOK NOW",
//       "buttonAction": "book_trial"
//     }
//   ]
// }
