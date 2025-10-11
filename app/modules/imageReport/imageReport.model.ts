import { model, Schema } from "mongoose";
import { TimageReport } from "./imageReport.interface";

const imageReportSchema = new Schema<TimageReport>({
  reportType: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    maxlength: 500,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true,
    index: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users', 
    index: true
  },
  reporterId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users',
    index: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', "dismiss"],
    default: 'pending',
    index: true
  },
  isdeleted : {type:Boolean,default:false}
}, {
  timestamps: true, 
   strict: "throw"
});

export const imageReportModel = model('imageReports',imageReportSchema)