import { Request, Response } from "express";
import { productServices } from "./product.services";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";


const createProduct = catchAsync(async (req: Request, res: Response) => {

    const body = req.body;
    const createProduct= await productServices.createProductIntoDB(body);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product is created succesfully',
        data: createProduct,
    })
 
})

const getAllProducts= catchAsync(async (req: Request, res: Response)=>{
    const getAllProducts= await productServices.getAllProductsFromDB();
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product  succesfully',
        data: getAllProducts,
    })
})


const searchProducts = catchAsync(async (req: Request, res: Response) => {
    const { query } = req.query;
    const filteredProducts = await productServices.searchProductsInDB(query as string);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Products matching '${query}'`,
        data: filteredProducts,
    });
});


export const productControllers={
    createProduct,
    getAllProducts,
    searchProducts
}