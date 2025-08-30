import { model, Schema } from "mongoose";
import { Torder } from "./order.interface";

const OrderSchema = new Schema<Torder>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "products",  
      required: [true, 'product id is required'],
    },
    size: {
      type: String,
      required: [true, 'please select your size'],
    },
    color: {
      type: String,
      required: [true, 'please select color'],
    },
    delivaryDate: {
      type: Date,
      required: [true, 'please input delivary date'],
    },
    reciverId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: [true,'reciver id is required'],
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    message: {
      type: String,
     required: [true,'please input a short message'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const OrderModel = model<Torder>("orders", OrderSchema);