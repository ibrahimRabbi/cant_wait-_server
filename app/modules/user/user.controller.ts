import { createAdminService, createUserService} from "./user.services";
import { catchAsync } from "../../helper/catchAsync";

export const createFreeTrailUserController = catchAsync(async (req, res, next) => {
    const creating = await createUserService(req.body);
    res.status(200).json({
        success: true,
        status: 200,
        response: creating
    })
})
export const createAdminUserController = catchAsync(async (req, res, next) => {
    const creating = await createAdminService(req.body);
    res.status(200).json({
        success: true,
        status: 200,
        response: creating
    })
})
