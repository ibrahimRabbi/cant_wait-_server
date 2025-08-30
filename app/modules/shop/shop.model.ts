import { Schema, model } from "mongoose";
import { Tproduct, Trating } from "./shop.interface";

const ratingSchema = new Schema<Trating>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'users', 
      required: [true, "User ID is required for rating"] 
    },
    rating: { 
      type: Number, 
      required: [true, "Rating value is required"], 
      min: [1, "Rating must be at least 1"], 
      max: [5, "Rating cannot be more than 5"] 
    },
    comment: { type: String },
  },
  { _id: false }
);






const productSchema = new Schema<Tproduct>(
  {
    title: { 
      type: String, 
      required: [true, "Product title is required"] ,
      maxlength:[22, 'title maxium 22 character will be applicable']
    },
    price: { 
      type: Number, 
      required: [true, "Product price is required"] 
    },
    description: { 
      type: String, 
      required: [true, "Product description is required"] 
    },
    image: { 
      type: String, 
      required: [true, "Product image is required"] 
    },
    size: { 
      type: [String], 
      required: [true, "At least one size is required"] 
    },
    color: { 
      type: [String], 
      required: [true, "At least one color is required"] 
    },
    category: { 
      type: String, 
      required: [true, "Product category is required"] 
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "unisex"],
        message: "Gender must be either 'male', 'female', or 'unisex'",
      },
      required: [true, "Gender is required"],
    },
    inStock: { 
      type: Number, 
      required: [true, "Stock quantity is required"], 
      default: 0 
    },
    tags: { 
      type: [String], 
      default: [] 
    },
    rating: { 
      type: [ratingSchema], 
      default: [] 
    },
    isDeleted:{type:Boolean,default:false}
  },
  {
    timestamps: true,
    strict: "throw", 
  }
);

export const ProductModel = model<Tproduct>("products", productSchema);
