import { Types } from "mongoose";

export type TNotification = {
    userId: Types.ObjectId | 'all';
    title: string,
    message: string;
    link: string;
    isRead: boolean;
    isDeleted?:boolean
}