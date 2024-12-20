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
        type: String,
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
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true,  versionKey: false},)


// Soft delete filter when getting all product
productSchema.pre('find', async function(next){
    this.find({isDeleted:{$ne:true}})
    next()
})


// Soft delete filter when getting single product
productSchema.pre('findOne', async function(next){
    this.findOne({isDeleted:{$ne:true}})
    next()
})

// Soft delete filter for aggregation queries
productSchema.pre('aggregate', async function(next){
    this.pipeline().unshift({$match: {isDeleted:{$ne:true}}})
    next()
})


export const Product= model<TProduct>("Product", productSchema);