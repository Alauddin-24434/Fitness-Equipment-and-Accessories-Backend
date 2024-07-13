import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";


const createProductIntoDB = async (payload: TProduct) => {
 
      // Check if a product with the same name already exists
    //   const existingProduct = await Product.findOne({ name: payload.name });
  
 
      // Create the product if it doesn't already exist
      const result = await Product.create(payload);
  
      // Return the created product
      return result;
  
  };
  const getAllProductsFromDB = async (
    searchTerm: string,
    category: string, 
    minPrice: string,
    maxPrice: string
) => {
    // Split the comma-separated string into an array of categories
    const categories = category ? category.split(',') : [];

   

    let filter: any = {};

    // Search query
    if (searchTerm) {
        filter.name = { $regex: searchTerm, $options: 'i' };
    }

    // Category filter
    if (categories.length > 0) {
        // Use $in operator to match any of the categories in the array
        filter.category = { $in: categories.map(cat => new RegExp(cat.trim(), 'i')) };
       
    }

    // Price range filter (if provided)
    if (minPrice && maxPrice) {
        // Convert minPrice and maxPrice to numbers if they represent numeric values
        filter.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    }
    // Fetch products with applied filters
    const products = await Product.find(filter);

    return products;
};



const deleteProductByIdFromDB= async (id:string)=>{
    const softDeleteById= await Product.updateOne({_id:id}, {isDeleted:true})
    return softDeleteById
}
const getSingleProductByIdFromDB= async (id:string)=>{
    const result= await Product.findById({_id:id})
    return result;
}






export const productServices={
    createProductIntoDB,
    getAllProductsFromDB,
    deleteProductByIdFromDB,
    getSingleProductByIdFromDB


}