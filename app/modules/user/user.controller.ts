import { createAdminService, createUserService, updateUserService } from "./user.services";
import { catchAsync } from "../../helper/catchAsync";
import { RequestHandler } from "express";
import { userModel } from "./user.model";
import status from "http-status";


export const createUserController = catchAsync(async (req, res, next) => {
    const createUserAndGenarateToken = await createUserService(req.body);
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


export const getAllUserController: RequestHandler = catchAsync(async (req, res, next) => {

    if (req.user?.role !== 'admin') {
        res.status(status.UNAUTHORIZED).json({
            sucess: false,
            status: status.UNAUTHORIZED,
            message: "You are not authorized to get all user"
        })
    }

    const user = await userModel.find({ isDeleted: { $ne: true } });
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

    let userData;

    if (req.query.gender) {
        userData = await userModel.find({
            $and: [
                { isDeleted: { $ne: true } },
                { gender: { $ne: req.user.gender } }
            ]
        });
    }

    if (req.query.successUser) {
        userData = await userModel.find({
            $and: [
                { isDeleted: { $ne: true } },
                { isEngaged: { $eq: true } }
            ]
        });
    }

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
