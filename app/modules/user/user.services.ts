import { userModel } from "./user.model";
import { envData } from "../../config/envData";
import jwt from 'jsonwebtoken'
import { imageHostToCloudinary } from "../../helper/imageHostToCloudinary";
import { Request } from "express";



export const createUserService = async (req: Request) => {

    const checkExistancy = await userModel.findOne({ email: req.body?.email })
    if (checkExistancy) {
        throw new Error('this user Already Exist')
    }

    const imageName = `${req.body.name}_${Math.random().toString().split('.')[1]}`
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

    req.body.role = 'user';
    req.body.subscriptionPlan = 'null';

    const newUser = await userModel.create(req.body);
    if (!newUser) {
        throw new Error('Failed to create user');
    }

    const credentials = {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        gender: newUser.gender
    }

    const accessToken = jwt.sign(credentials, envData.secretKey as string, { expiresIn: '12d' })
    return accessToken

}


export const createAdminService = async (userData: any) => {

    userData.role = 'admin';
    userData.isApprove = 'approved';
    userData.subscriptionPlan = 'null';

    const newUser = await userModel.create(userData);
    if (!newUser) {
        throw new Error('Failed to create Admin');
    }

    const credentials = {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        gender: newUser.gender
    }

    const accessToken = jwt.sign(credentials, envData.secretKey as string, { expiresIn: '7d' })
    return accessToken

}


export const updateUserService = async (id: string, userData: any) => {

    const updatedUser = await userModel.findByIdAndUpdate(
        id,
        { $set: userData },
        {
            new: true,
            runValidators: true,
            context: 'query'
        });
    if (!updatedUser) {
        throw new Error('Failed to update user');
    }
    return updatedUser;
}