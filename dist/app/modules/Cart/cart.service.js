"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartServices = void 0;
const cart_model_1 = require("./cart.model");
const addCartFromClintIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the same product exists in the cart for the user
    const isExistSameProduct = yield cart_model_1.Cart.findOne({
        userId: payload.userId,
        productId: payload.productId,
    });
    if (isExistSameProduct) {
        // Update the quantity of the existing product in the cart
        const updatedCart = yield cart_model_1.Cart.updateOne({ _id: isExistSameProduct._id }, { $inc: { prductQuentity: payload.prductQuentity } });
        return updatedCart;
    }
    else {
        // Create a new cart entry
        const result = yield cart_model_1.Cart.create(payload);
        return result;
    }
});
const getAllCartIntoDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find cart items for the given userId and populate productId and userId fields
        const result = yield cart_model_1.Cart.find({ userId }).populate("productId").populate("userId");
        console.log(result);
        return result;
    }
    catch (error) {
        console.error("Error fetching cart data:", error);
        throw error;
    }
});
const updateCatByIdCartFromDB = (id, quantityStatus) => __awaiter(void 0, void 0, void 0, function* () {
    let update;
    if (quantityStatus === 'increment') {
        update = { $inc: { prductQuentity: 1 } };
    }
    else if (quantityStatus === 'decrement') {
        update = { $inc: { prductQuentity: -1 } };
    }
    else {
        throw new Error('Invalid quantity status');
    }
    const result = yield cart_model_1.Cart.findByIdAndUpdate(id, update, { new: true });
    if (!result) {
        throw new Error('Cart item not found');
    }
    return result;
});
const deleteSingleCartFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.Cart.deleteOne({ _id: id });
    return result;
});
const allCartDeleteOnlySingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const matchingUser = yield cart_model_1.Cart.deleteMany({ userId: id });
    return matchingUser;
});
exports.cartServices = {
    addCartFromClintIntoDB,
    deleteSingleCartFromDB,
    allCartDeleteOnlySingleUser,
    getAllCartIntoDB,
    updateCatByIdCartFromDB
};
