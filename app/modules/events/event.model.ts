import { model, Schema } from "mongoose";
import { Tevent } from "./event.interface";

const eventSchema = new Schema<Tevent>(
  {
    name: {
      type: String,
      required: [true, "Event name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Event price is required"],
      min: [0, "Price cannot be negative"],
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
    },
    time: {
      type: String,
      required: [true, "Event time is required"],
    },
    memberType: {
      type: String,
      required: [true, "Organizer/Member name is required"],
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
    },
    availableSeats: {
      type: Number,
      required: [true, "Available seats count is required"],
      min: [1, "Available seats cannot be negative"],
    },
    image: {
      type: String,
      required: [true, "Event image is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    strict: "throw",
  }
);

export const EventModel = model<Tevent>("events", eventSchema);