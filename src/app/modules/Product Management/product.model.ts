import mongoose, { model } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema= new mongoose.Schema<TProduct>({
    name: {
        type:String,
        required:[true, "Product Name is Required"]
    },
    price: {
        type:Number,
        required:[true, "Price is Required"]
    },
    description:  {
        type:String,
        required:[true, "description is Required"]
    },
    images: {
        type: [String],
        required:[true, "images is Required"]
    },
    category: {
        type:String,
        required:[true, "category  is Required"]
    },
    stock: {
        type:Number,
        required:[true, "Stock is Required"]
    },
},{timestamps:true})




export const Product= model<TProduct>("Product", productSchema);