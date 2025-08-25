import { createAdminService, createUserService, updateUserService } from "./user.services";
import { catchAsync } from "../../helper/catchAsync";


export const createUserController = catchAsync(async (req, res, next) => {
    const createUserAndGenarateToken = await createUserService(req.body);
    res.status(200).json({
        success: true,
        status: 200,
        message:'user created successfully',
        token: createUserAndGenarateToken
    })
})


export const createAdminUserController = catchAsync(async (req, res, next) => {
    const createAdminandGenarateToken = await createAdminService(req.body);
    res.status(200).json({
        success: true,
        status: 200,
        message:'admin created successfully',
        token: createAdminandGenarateToken
    })
})


export const updateUserController = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const updating = await updateUserService(id, req.body);
    res.status(200).json({
        success: true,
        status: 200,
        message:'user updated successfully',
        response: updating
    })
}
)
