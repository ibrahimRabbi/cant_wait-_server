import { userModel } from "./user.model";
import { envData } from "../../config/envData";
import jwt from 'jsonwebtoken'
import { imageHostToCloudinary } from "../../helper/imageHostToCloudinary";
import { Request } from "express";



export const createUserService = async (req: Request) => {

    const imageName = `${req.body.name}_${Math.random().toString().split('.')[1]}`



   const profileImagePath = req.files?.profile?.[0]?.path || 'No profile image uploaded';
const documentImagePath = req.files?.document?.[0]?.path || 'No document uploaded';
const document1ImagePath = req.files?.document1?.[0]?.path || 'No document1 uploaded';
const document2ImagePath = req.files?.document2?.[0]?.path || 'No document2 uploaded';

console.log('Profile Image Path:', profileImagePath);
console.log('Document Path:', documentImagePath);
console.log('Document1 Path:', document1ImagePath);
console.log('Document2 Path:', document2ImagePath);


    // const { secure_url: documentImage } = await imageHostToCloudinary(imageName, documentImagePath as string)
    // const { secure_url: profileImage } = await imageHostToCloudinary(imageName, profileImagePath as string)
    const { secure_url: profileImage } = await imageHostToCloudinary(imageName, document1ImagePath as string)
    // req.body.document = documentImage
    // req.body.profile = profileImage
    // req.body.role = 'user';
    // req.body.subscriptionPlan = 'null';

    // console.log(req.body)
    console.log(profileImage)


    // const newUser = await userModel.create(req.body);
    // if (!newUser) {
    //     throw new Error('Failed to create user');
    // }

    // const credentials = {
    //     name: newUser.name,
    //     email: newUser.email,
    //     role: newUser.role,
    // }

    // const accessToken = jwt.sign(credentials, envData.secretKey as string, { expiresIn: '7d' })
    // return accessToken

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
        gender: newUser.gender
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