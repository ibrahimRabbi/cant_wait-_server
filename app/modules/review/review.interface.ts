import { Types } from "mongoose"

export type Treview = {
    userId: Types.ObjectId;
    rating: number;
    message: string;
    isApproved: 'pending' | 'approve'
}