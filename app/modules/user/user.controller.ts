import { createAdminService, createUserService, updateUserService } from "./user.services";
import { catchAsync } from "../../helper/catchAsync";
import { RequestHandler } from "express";
import { userModel } from "./user.model";
import status from "http-status";


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
    const skipData = limit * (parseInt(req.query.page as string) - 1)

    if (req.user?.role !== 'admin') {
        res.status(status.UNAUTHORIZED).json({
            sucess: false,
            status: status.UNAUTHORIZED,
            message: "You are not authorized to get all user"
        })
    }

    const user = await userModel.find({ isDeleted: { $ne: true } }).skip(skipData).limit(limit);
    if (!user) {
        throw new Error("internal server error")
    }

    res.status(status.OK).json({
        success: true,
        status: status.OK,
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

    let queryFilters: any = { gender: { $ne: req.user.gender }, isDeleted: { $ne: true } };
    const pageNumber: number = parseInt(req?.query?.page as string)
    const limitValue: number = parseInt(req.query?.limit as string)
    const skipValue = (pageNumber - 1) * limitValue

   

    if (req.query.marital_status) {
        queryFilters.marital_status = req.query.marital_status;
    }

    if (req.query.minAge && req.query.maxAge) {
        queryFilters.age = {
            $gte: req.query.minAge,
            $lte: req.query.maxAge,
        };
    }

    if (req.query.ethnicity) {
        queryFilters.ethnicity = req.query.ethnicity;
    }

    if (req.query.country) {
        queryFilters.country = req.query.country;
    }

    if (req.query.occupation) {
        queryFilters.occupation = req.query.occupation;
    }

    if (req.query.denimanation) {
        queryFilters.denimanation = req.query.denimanation;
    }

    if (req.query.state) {
        queryFilters.state = { $regex: req.query.state, $options: 'i' };
    }

    if (req.query.city) {
        queryFilters.city = { $regex: req.query.city, $options: 'i' };
    }

    if (req.query.hobby) {
        queryFilters.hobby = req.query.hobby;
    }

    if (req.query.name) {
        queryFilters.name = { $regex: req.query.name, $options: 'i' }
    }

    let userData = await userModel.find(queryFilters).skip(skipValue).limit(limitValue as number);
    const totalData = await userModel.countDocuments({ gender: { $ne: req.user.gender }, isDeleted: { $ne: true } })

    if (!userData) {
        throw new Error("faild to get user");
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
