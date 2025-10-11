import { model, Schema } from "mongoose";
import { Totp } from "./otp.interface";

const otpSchema = new Schema<Totp>({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
    unique:true
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // auto delete after 5 minutes (MongoDB TTL index)
  },
});

export const OtpModel = model('otp', otpSchema)