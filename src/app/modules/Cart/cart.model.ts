import mongoose, { model } from "mongoose";
import { TCart } from "./cart.interface";
import { Schema } from "mongoose";


const cartSchema= new mongoose.Schema<TCart>({
    productId: {
        type: Schema.Types.ObjectId,
        ref:"Product",

    },
    userId: {
        type: Schema.Types.ObjectId,
        ref:"User",
    },
    prductQuentity: {
        type:Number,
   
    },
    
},{timestamps:true,  versionKey: false})





export const Cart= model<TCart>("Cart", cartSchema);