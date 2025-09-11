import { model, Schema } from "mongoose";
import { TbookEvent } from "./book.services";

const bookEventScehma = new Schema<TbookEvent>({
    eventId: { type: Schema.Types.ObjectId, ref: 'events', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    price: { type: Number, required: true }
}
,{timestamps:true})

 export const bookEventModel = model('bookEvents', bookEventScehma)
 
 