import { model, Schema } from "mongoose";
import { Treview } from "./review.interface";

const reviewSchema = new Schema<Treview>({
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    rating: { type: Number },
    message: { type: String, required: true },
    isApproved: { type: Boolean, default: false},
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

export const reviewModel = model('reviews', reviewSchema)