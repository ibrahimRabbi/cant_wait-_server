import { createAdminService, createUserService, updateUserService } from "./user.services";
import { catchAsync } from "../../helper/catchAsync";
import { RequestHandler } from "express";
import { userModel } from "./user.model";
import status from "http-status";
import { imageHostToCloudinary } from "../../helper/imageHostToCloudinary";


export const createUserController = catchAsync(async (req, res, next) => {

    const createUserAndGenarateToken = await createUserService(req);
    res.status(200).json({
        success: true,
        status: 200,
        message: 'user created successfully',
        token: createUserAndGenarateToken
    })
})

export const createAdminUserController = catchAsync(async (req, res, next) => {
    const createAdminandGenarateToken = await createAdminService(req.body);
    res.status(200).json({
        success: true,
        status: 200,
        message: 'admin created successfully',
        token: createAdminandGenarateToken
    })
})

export const updateUserController = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const updating = await updateUserService(id, req.body);
    res.status(200).json({
        success: true,
        status: 200,
        message: 'user updated successfully',
        response: updating
    })
})

export const addPhotoController = catchAsync(async (req, res, next) => {

    const { id } = req.params;
    const imageName = `cant_wait_${Math.random().toString().split('.')[1]}`
    const imagePath = req?.file?.path || 'No document1 uploaded';
    const image = await imageHostToCloudinary(imageName, imagePath as string)
  



    const addingPhoto = await userModel.findByIdAndUpdate(
        id,
        { $push: { detailsImage: (image as unknown as { secure_url: string })?.secure_url || 'null' } },
        { new: true, runValidators: true, context: 'query' }
    )

    if (!addingPhoto) {
        throw new Error('faild to add image')
    }
    res.status(200).json({
        success: true,
        status: 200,
        message: 'photo addad successfully',
        response: addingPhoto
    })
})

export const deletePhotoController = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const deleting = await userModel.findByIdAndUpdate(id, { $pull: { detailsImage: req?.body?.imagelink } }, { new: true, runValidators: true, context: 'query' })
    if (!deleting) {
        throw new Error('faild to delete image')
    }
    res.status(200).json({
        success: true,
        status: 200,
        message: 'user updated successfully',
        response: deleting
    })
})

export const updateUserProfileAndCoverController: RequestHandler = catchAsync(async (req, res, next) => {

    const imageName = `${req?.user.name}_${Math.random().toString().split('.')[1]}`
    const fileNames = req?.files ? Object.keys(req.files) : [];

    await Promise.all(fileNames.map(async (name: string) => {
        const imagePath = (req.files as { [key: string]: { path: string }[] })?.[name]?.[0]?.path;

        if (imagePath) {
            const { secure_url: imageUrl } = await imageHostToCloudinary(imageName, imagePath) as { secure_url: string };
            req.body[name] = imageUrl;
        } else {
            throw new Error('no image or document Attach');
        }
    }));

    const updateimageFiled = await userModel.findByIdAndUpdate(req?.params?.id, req?.body, { new: true, runValidators: true, context: 'query' })


    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "profile changed successfully",
        user: updateimageFiled
    });


})

export const getUserController: RequestHandler = catchAsync(async (req, res, next) => {

    const user = req.user

    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "user Retraive successfully",
        user: user
    });


})

export const getUserSavedItemsController: RequestHandler = catchAsync(async (req, res, next) => {

    const items = await userModel.findById(req.user._id).populate('saveItems').select('saveItems')

    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "save item Retraive successfully",
        data: items
    });


})

export const getAllUserController: RequestHandler = catchAsync(async (req, res, next) => {

    let limit = parseInt(req.query.limit as string)
    let pageNumber = parseInt(req.query.page as string)
    const skipData = limit * (pageNumber - 1)
    let sorting = 'createdAt'


    if (req.query?.sort) {
        sorting = '-createdAt'
    }

    if (req.user?.role !== 'admin') {
        res.status(status.UNAUTHORIZED).json({
            sucess: false,
            status: status.UNAUTHORIZED,
            message: "You are not authorized to get all user"
        })
    }

    const user = await userModel.find({ isDeleted: { $ne: true } }).sort(sorting).skip(skipData).limit(limit);
    const totalData = await userModel.countDocuments({ isDeleted: { $ne: true } })
    if (!user) {
        throw new Error("internal server error")
    }

    res.status(status.OK).json({
        success: true,
        status: status.OK,
        meta: {
            totalData: totalData,
            limit: limit,
            pageNumber: pageNumber
        },
        message: "users Retraive successfully",
        data: user
    });


})

export const getUserByIdController: RequestHandler = catchAsync(async (req, res, next) => {


    const user = await userModel.findOne({
        $and: [
            { isDeleted: { $ne: true } },
            { _id: req.params.id }
        ]
    });
    if (!user) {
        throw new Error("No user found")
    }

    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "users Retraive successfully",
        data: user
    });


})

export const getfilteringUserController: RequestHandler = catchAsync(async (req, res, next) => {

    // Get blocked user ids first
    const myid = await userModel.findById(req.user?._id).select("blockedUsers blockedMe").lean();

    const blockedIds = myid
        ? [
            ...(myid.blockedUsers ? myid.blockedUsers.map(id => id.toString()) : []),
            ...(myid.blockedMe ? myid.blockedMe.map(id => id.toString()) : []),
            myid._id?.toString?.() || myid
        ]
        : [];

    // Base query filters (always applied with AND)
    let baseFilters: any = { 
        _id: { $nin: blockedIds }, 
        gender: { $ne: req.user.gender }, 
        status: 'approved', 
        role: { $eq: 'user' }, 
        isDeleted: { $ne: true } 
    };

    const pageNumber: number = parseInt(req?.query?.page as string) || 1;
    const limitValue: number = parseInt(req.query?.limit as string) || 10;
    const skipValue = (pageNumber - 1) * limitValue;

    // OR conditions array - যেকোনো একটা match করলেই হবে
    let orConditions: any[] = [];

    if (req.query.marital_status) {
        orConditions.push({ marital_status: { $regex: req.query.marital_status, $options: 'i' } });
    }

    if (req.query.minAge && req.query.maxAge) {
        orConditions.push({ 
            age: {
                $gte: parseInt(req.query.minAge as string),
                $lte: parseInt(req.query.maxAge as string),
            }
        });
    }

    if (req.query.ethnicity) {
        orConditions.push({ ethnicity: { $regex: req.query.ethnicity, $options: 'i' } });
    }

    if (req.query.country) {
        orConditions.push({ country: { $regex: req.query.country, $options: 'i' } });
    }

    if (req.query.occupation) {
        orConditions.push({ occupation: { $regex: req.query.occupation, $options: 'i' } });
    }

    if (req.query.denimanation) {
        orConditions.push({ denimanation: { $regex: req.query.denimanation, $options: 'i' } });
    }

    if (req.query.state) {
        orConditions.push({ state: { $regex: req.query.state, $options: 'i' } });
    }

    if (req.query.city) {
        orConditions.push({ city: { $regex: req.query.city, $options: 'i' } });
    }

    if (req.query.hobby) {
        orConditions.push({ hobby: { $regex: req.query.hobby, $options: 'i' } });
    }

    if (req.query.name) {
        orConditions.push({ name: { $regex: req.query.name, $options: 'i' } });
    }

    // Final query construction
    let finalQuery: any = { ...baseFilters };
    
    // যদি কোনো OR condition থাকে তাহলে সেটা add করো
    if (orConditions.length > 0) {
        finalQuery.$or = orConditions;
    }

    // Execute query
    let userData = await userModel.find(finalQuery).skip(skipValue).limit(limitValue);
    const totalData = await userModel.countDocuments(finalQuery);

    if (!userData) {
        throw new Error("Failed to get user");
    }

    // Send the response
    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "Users retrieved successfully",
        meta: {
            totalData: totalData,
            limit: limitValue,
            pageNumber: pageNumber
        },
        data: userData
    });
});

export const sreachUserByNameController: RequestHandler = catchAsync(async (req, res, next) => {

    let userData: any = []

    if (req.query.userName) {
        userData = await userModel.find({
            $or: [
                { name: { $regex: req.query.userName, $options: 'i' } },
                { email: { $regex: req.query.userName, $options: 'i' } },
                { phoneNumber: { $regex: req.query.userName, $options: 'i' } },

            ],
            isDeleted: { $ne: true }
        });
    }

    if (!userData) {
        throw new Error("No user found")
    }

    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "users Retraive successfully",
        data: userData
    });

})

export const userStateController: RequestHandler = catchAsync(async (req, res, next) => {


    const pendingUser = await userModel.find({ $and: [{ isDeleted: { $ne: true } }, { status: 'pending' }] }).countDocuments()
    const premiumUser = await userModel.find({ $and: [{ isDeleted: { $ne: true } }, { subscriptionPlan: 'premium' }] }).countDocuments()
    const standardUser = await userModel.find({ $and: [{ isDeleted: { $ne: true } }, { subscriptionPlan: 'standard' }] }).countDocuments()
    const totalUser = await userModel.find({ $and: [{ isDeleted: { $ne: true } }] }).countDocuments()


    if (!pendingUser || !premiumUser || !standardUser || !totalUser) {
        throw new Error("faild to get state")
    }

    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "users state Retraive successfully",
        data: { pendingUser, standardUser, premiumUser, totalUser }
    });
})

export const successUserController: RequestHandler = catchAsync(async (req, res, next) => {


    const userData = await userModel.find({
        $and: [
            { isDeleted: { $ne: true } },
            { isEngaged: { $eq: true } }
        ]
    }).limit(8).sort({ createdAt: 1 });



    if (!userData) {
        throw new Error("No user found")
    }

    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "users Retraive successfully",
        data: userData
    });
})

export const saveItemsController: RequestHandler = catchAsync(async (req, res, next) => {

    const checkExistancy = await userModel.findOne({ saveItems: req.body.productId })
    if (checkExistancy) {
        return res.status(status.OK).json({
            success: true,
            status: status.OK,
            message: "item already saved",
            data: ''
        });
    }
    const pushItem = await userModel.findByIdAndUpdate(req.user._id, { $addToSet: { saveItems: req.body.productId } }, { new: true, runValidators: true, context: 'query' })

    if (!pushItem) {
        throw new Error("No user found")
    }

    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "item saved",
        data: pushItem
    });
})

export const deleteUserController: RequestHandler = catchAsync(async (req, res, next) => {

    if (req.user?.role !== 'admin') {
        res.status(status.UNAUTHORIZED).json({
            sucess: false,
            status: status.UNAUTHORIZED,
            message: "You are not authorized to delete user"
        })
    }

    const user = await userModel.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    if (!user) {
        throw new Error("faild to delete user")
    }
    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "user deleted successfully",
        user: user
    });


})

export const changeStatusUserController: RequestHandler = catchAsync(async (req, res, next) => {

    if (req.user?.role !== 'admin') {
        res.status(status.UNAUTHORIZED).json({
            sucess: false,
            status: status.UNAUTHORIZED,
            message: "You are not authorized to change user status"
        })
    }


    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
        throw new Error("faild to change status")
    }
    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "user status changed successfully",
        user: user
    });

})

export const getStatusBasedUserController: RequestHandler = catchAsync(async (req, res, next) => {

    let limit = parseInt(req.query.limit as string)
    let pageNumber = parseInt(req.query.page as string)
    const skipData = limit * (pageNumber - 1)



    if (req.user?.role !== 'admin') {
        res.status(status.UNAUTHORIZED).json({
            sucess: false,
            status: status.UNAUTHORIZED,
            message: "You are not authorized to delete user"
        })
    }

    const user = await userModel.find({ status: req?.query?.status, isDeleted: { $ne: true } }).skip(skipData).limit(limit);
    const totalData = await userModel.find({ status: req?.query?.status, isDeleted: { $ne: true } }).countDocuments();


    if (!user) {
        throw new Error("faild to get user")
    }
    res.status(status.OK).json({
        success: true,
        status: status.OK,
        meta: {
            totalData: totalData,
            limit: limit,
            pageNumber: pageNumber
        },
        message: "user retrive successfully",
        user: user
    });
})

export const getSubscriberUserController: RequestHandler = catchAsync(async (req, res, next) => {

    let limit = parseInt(req.query.limit as string)
    let pageNumber = parseInt(req.query.page as string)
    const skipData = limit * (pageNumber - 1)

    console.log(req.query)

    if (req.user?.role !== 'admin') {
        res.status(status.UNAUTHORIZED).json({
            sucess: false,
            status: status.UNAUTHORIZED,
            message: "You are not authorized to delete user"
        })
    }

    const user = await userModel.find({ subscriptionPlan: { $ne: 'null' }, isDeleted: { $ne: true } }).skip(skipData).limit(limit);
    const totalData = await userModel.find({ subscriptionPlan: { $ne: 'null' }, isDeleted: { $ne: true } }).countDocuments();


    if (!user) {
        throw new Error("faild to get user")
    }
    res.status(status.OK).json({
        success: true,
        status: status.OK,
        meta: {
            totalData: totalData,
            limit: limit,
            pageNumber: pageNumber
        },
        message: "user retrive successfully",
        user: user
    });


})

export const subscriptionPurchesController: RequestHandler = catchAsync(async (req, res, next) => {

    const durationObj = {
        monthly: 30,
        weekly: 7,
        yearly: 365,
    } as const;

    type DurationType = keyof typeof durationObj;
    const durationType: DurationType = (req.body.durationType as DurationType) || 'monthly';
    // console.log(durationObj[durationType])

   
    const value = {
        subscriptionExpiresAt: new Date(Date.now() + (durationObj[durationType] || 30) * 24 * 60 * 60 * 1000),
        subscriptionPlan: req.body.planType,
        subscriptionDuration: durationObj[durationType],
        subscriptionStatus: 'active'
    }


    const user = await userModel.findByIdAndUpdate(
        req?.params?.userId,
        value,
        { new: true, runValidators: true, context: 'query' });
    if (!user) {
        throw new Error("faild to process subscription")
    }


    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "user status changed successfully",
        user: user
    });


})

export const blockedUserController: RequestHandler = catchAsync(async (req, res, next) => {

    const myId = req?.user?._id;
    const userId = req.params?.userId

    const blocking = await userModel.findByIdAndUpdate(myId, { $push: { blockedUsers: userId } })
    if (!blocking) {
        throw new Error('faild to blocked user')
    }

    const blockme = await userModel.findByIdAndUpdate(userId, { $push: { blockedMe: myId } })
    if (!blockme) {
        throw new Error('faild to blocked user')
    }

    res.status(status.OK).json({
        success: true,
        status: status.OK,
        message: "user blocked successfully",
        user: blocking
    });


})






