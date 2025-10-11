import { model, Schema } from "mongoose";
import { TbookEvent } from "./bookEvent.interface";
 

const bookEventScehma = new Schema<TbookEvent>({
    eventId: { type: Schema.Types.ObjectId, ref: 'events', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ['booked', 'cancelled', ''], default: 'booked' },
    isDeleted: { type: Boolean, default: false }
}
,{timestamps:true})

 export const bookEventModel = model('bookEvents', bookEventScehma)
 
 