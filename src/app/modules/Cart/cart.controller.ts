import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { cartServices } from "./cart.service";


const createCart = catchAsync(async (req, res) => {

    const body = req.body;
    const addCart= await cartServices.addCartFromClintIntoDB(body);
    

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'Cart added succesfully',
        data: addCart,
    })
 
})

const getAllCart= catchAsync(async (req,res)=>{
    const id= req.params.id;
    
    const cartResult= await cartServices.getAllCartIntoDB(id);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'Cart reacived succesfully',
        data: cartResult,

    })
})
const updateCartById= catchAsync(async (req,res)=>{
    const id= req.params.id;
    const {quantityStatus}= req.body;
   
    const cartResult= await cartServices.updateCatByIdCartFromDB(id, quantityStatus as string);
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'Cart update succesfully',
        data: cartResult,

    })
})

const deleteCartById= catchAsync(async(req,res)=>{
    const id= req.params.id;
    const deletedResult= await cartServices.deleteSingleCartFromDB(id)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Single deleted successfully!',
        data:deletedResult
    })
})
const deleteAllOnlySingleUser= catchAsync(async(req,res)=>{
    const id= req.params.id;
    const deletedResult= await cartServices.allCartDeleteOnlySingleUser(id)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'All cart successfully!',
        data:deletedResult
    })
})

export const cartControllers={
    createCart,
    deleteCartById,
    deleteAllOnlySingleUser,
    getAllCart,
    updateCartById

}