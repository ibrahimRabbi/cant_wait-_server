import { Types } from "mongoose";

export type TimageReport = {
  reportType: string;
  details?: string;
  imageUrl?: string;
  userId : Types.ObjectId;
  reporterId : Types.ObjectId;
  status : 'pending' | 'approved'| "dismiss";
  isdeleted:boolean
}