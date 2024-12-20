
import { productServices } from "./product.services";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";


const createProduct = catchAsync(async (req, res) => {

    const body = req.body;
    const createProduct= await productServices.createProductIntoDB(body);
    
    console.log(createProduct)
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product is created succesfully',
        data: createProduct,
    })
 
})

const getAllProducts= catchAsync(async (req, res)=>{
    const { searchTerm, category, minPrice,maxPrice} = req.query;

    const getAllProducts= await productServices.getAllProductsFromDB(searchTerm as string, category as string,  minPrice as string, maxPrice as string);

    if(!getAllProducts.length){
    sendResponse(res,{
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message:`Product not found!`,
        data: getAllProducts.length
    })
  }
  else{
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product received succesfully',
        data: getAllProducts,
    })
  }
})

// Route handler to fetch products by category
const getProductCategories = async (req: Request,res:Response) => {
    try {
        // Call service function to fetch unique product categories
        const categoryResult = await productServices.getProductCategoriesFomDB();

        // Respond with success message and retrieved categories
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Product categories received successfully",
            data: categoryResult
        });

    } catch (error:any) {
        const errorMessage = error.message || "Failed to fetch product categories.";
        const statusCode = httpStatus.INTERNAL_SERVER_ERROR;

        // Send error response
        sendResponse(res, {
            statusCode,
            success: false,
            message: errorMessage,
            data: null
        });
    }
};


const deleteProductById= catchAsync(async(req,res)=>{
    const id= req.params.id;
    const deletedResult= await productServices.deleteProductByIdFromDB(id)
    console.log(deletedResult)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Product deleted successfully!',
        data:deletedResult
    })
})
const getSingleProductById= catchAsync(async(req,res)=>{
    const id= req.params.id;
    const getSingleResult= await productServices.getSingleProductByIdFromDB(id)
  
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Product deleted successfully!',
        data:getSingleResult
    })
})



export const productControllers={
    createProduct,
    getAllProducts,
    deleteProductById,
    getSingleProductById,
    getProductCategories
   
}