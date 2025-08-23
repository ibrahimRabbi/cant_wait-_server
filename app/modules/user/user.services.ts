import { userModel } from "./user.model";

export const createUserService = async (userData: any) => {
    
        userData.role = 'user';
        userData.subscriptionPlan = 'null';
        const newUser = await userModel.create(userData);
        if (!newUser) {
            throw new Error('Failed to create user');
        }
        
        return newUser;
    
}

export const createAdminService = async (userData: any) => {
    
        userData.role = 'admin';
        userData.subscriptionPlan = 'null';
        const newUser = await userModel.create(userData);
        if (!newUser) {
            throw new Error('Failed to create user');
        }
        
        return newUser;
    
}