import { Types } from "mongoose";

export type Torder = {
    productId : Types.ObjectId;
    size:string;
    color:string;
    delivaryDate : Date;
    reciverId : Types.ObjectId;
    senderId : Types.ObjectId
    message: string;
    isDeleted:boolean
}