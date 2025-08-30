import { model, Schema } from "mongoose";
import { Tsubscription } from "./subs.interfacer";

const subscriptionSchema = new Schema<Tsubscription>(
  {
    planType: {
      type: String,
      enum: {
        values: ["trial", "premium", "standard"],
        message: "{VALUE} is not a valid subscription plan",
      },
      required: [true, "Subscription plan is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    duration: {
      type: Date,
      required: [true, "Duration is required"],
    },
    features: {
      type: [String],
      required: [true, "At least one feature must be provided"],
      validate: {
        validator: function (value: string[]) {
          return value.length > 0;
        },
        message: "Features array cannot be empty",
      },
    },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true,
    strict: "throw",
  }
);

export const SubscriptionModel = model<Tsubscription>(
  "Subscription",
  subscriptionSchema
);