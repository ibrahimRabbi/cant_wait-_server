import { Types } from "mongoose"

export type TbookEvent = {
    eventId: Types.ObjectId;
    userId : Types.ObjectId;
    price: number
}