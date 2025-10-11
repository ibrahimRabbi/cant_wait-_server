import { envData } from "../../config/envData";
import { userModel } from "../user/user.model";
import { TsignIn } from "./signIn.interface";
import jwt from 'jsonwebtoken'

export const signInService = async (payload: TsignIn) => {
    

    const checkExistancy = await userModel.findOne({ email: payload.email }).select('name email password role gender isDeleted');

    if (!checkExistancy) {
        throw new Error('user is not exist')
    }

    if (checkExistancy.password !== payload.password) {
        throw new Error('invalid password')
    }

    if (checkExistancy.isDeleted) {
        throw new Error('unthorized user')
    }

    const credentials = {
        name: checkExistancy.name,
        email: checkExistancy.email,
        role: checkExistancy.role,
        gender: checkExistancy.gender
    }
    if (payload.remember) {
        const accessToken = jwt.sign(credentials, envData.secretKey as string, { expiresIn: '12d' })
        return accessToken
    } else {
        const accessToken = jwt.sign(credentials, envData.secretKey as string, { expiresIn: '1d' })
        return accessToken
    }
}

export const adminSignInService = async (payload: TsignIn) => {


    const checkExistancy = await userModel.findOne({ email: payload.email }).select('name email password role gender isDeleted');

    if (!checkExistancy) {
        throw new Error('user is not exist')
    }

    if (checkExistancy.password !== payload.password) {
        throw new Error('invalid password')
    }

    if (checkExistancy.isDeleted) {
        throw new Error('unthorized user')
    }

    if (checkExistancy.role !== 'admin') {
        throw new Error('unthorized user')
    }

    const credentials = {
        name: checkExistancy.name,
        email: checkExistancy.email,
        role: checkExistancy.role,
        gender: checkExistancy.gender
    }
    const accessToken = jwt.sign(credentials, envData.secretKey as string, { expiresIn: '7d' })
    return accessToken
}