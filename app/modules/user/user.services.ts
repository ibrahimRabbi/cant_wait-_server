import { userModel } from "./user.model";
import { envData } from "../../config/envData";
import jwt from 'jsonwebtoken'



export const createUserService = async (userData: any) => {

    userData.role = 'user';
    userData.subscriptionPlan = 'null';

    const newUser = await userModel.create(userData);
    if (!newUser) {
        throw new Error('Failed to create user');
    }

    const credentials = {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
    }

    const accessToken = jwt.sign(credentials, envData.secretKey as string, { expiresIn: '7d' })
    return accessToken

}



export const createAdminService = async (userData: any) => {

    userData.role = 'admin';
    userData.subscriptionPlan = 'null';
    
    const newUser = await userModel.create(userData);
    if (!newUser) {
        throw new Error('Failed to create Admin');
    }

    const credentials = {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
    }

    const accessToken = jwt.sign(credentials, envData.secretKey as string, { expiresIn: '7d' })
    return accessToken

}


export const updateUserService = async (id: string, userData: any) => {
    console.log(userData)
    console.log(id)
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