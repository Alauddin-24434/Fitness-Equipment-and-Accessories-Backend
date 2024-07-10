import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";



const createProductIntoDB = async (payload: TProduct) => {
 
      // Check if a product with the same name already exists
      const existingProduct = await Product.findOne({ name: payload.name });
  
      // If a product with the same name exists, throw an error
      if (existingProduct) {
        throw new AppError(httpStatus.NOT_ACCEPTABLE, "This product name already exists!");
      }
  
      // Create the product if it doesn't already exist
      const result = await Product.create(payload);
  
      // Return the created product
      return result;
  
  };

  const getAllProductsFromDB= async ()=>{
    const resultAllProduct= await Product.find();
    return resultAllProduct;
  }


  const searchProductsInDB = async (query: string) => {
    const results = await Product.find({ name: { $regex: query, $options: 'i' } });
    return results;
};





export const productServices={
    createProductIntoDB,
    getAllProductsFromDB,
    searchProductsInDB
}