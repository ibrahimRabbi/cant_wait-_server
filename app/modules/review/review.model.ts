import { model, Schema } from "mongoose";
import { Treview } from "./review.interface";

const reviewSchema = new Schema<Treview>({
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    rating: { type: Number },
    message: { type: String, maxlength: 300, required: true },
    isApproved: { type: String, enum: ['pending', 'approve'], required: true, default: 'pending' }
}, { timestamps: true })

export const reviewModel = model('reviews', reviewSchema)