import { model, Schema } from "mongoose";
import { Tconversations, Tmessage } from "./conversation.interface";

const messageSchema = new Schema<Tmessage>({
    sender: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    text: { type: String, required: true }
},{timestamps:true})



const conversationSchema = new Schema<Tconversations>({
    members: { type: [Schema.Types.ObjectId], required: true },
    messages: { type: [messageSchema], required: true },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true })


export const conversationModel = model("conversations", conversationSchema);