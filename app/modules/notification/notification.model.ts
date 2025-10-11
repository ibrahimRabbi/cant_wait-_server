import { model, Schema } from "mongoose";
import { TNotification } from "./notification.intrface";

const notificationSchema = new Schema<TNotification>(
  {
    userId: { type: Schema.Types.Mixed, ref:'users', enum: ['all'], default: 'all', },
    title: { type: String, required: true },
    message: { type: String, required: true },
    link: { type: String },
    isRead: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true, strict: true }
);

export const NotificationModel = model<TNotification>("Notification", notificationSchema);