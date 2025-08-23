 
import { Types } from "mongoose"

export type Tmessage = {
    sender: Types.ObjectId,
    text: string
}



export type Tconversations = {
    members: Types.ObjectId[];
    messages: [Tmessage];
    isDeleted?: boolean;
}