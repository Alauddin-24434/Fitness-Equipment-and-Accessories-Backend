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
exports.productServices = void 0;
const product_model_1 = require("./product.model");
const createProductIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if a product with the same name already exists
    //   const existingProduct = await Product.findOne({ name: payload.name });
    // Create the product if it doesn't already exist
    const result = yield product_model_1.Product.create(payload);
    // Return the created product
    return result;
});
const getAllProductsFromDB = (searchTerm, category, minPrice, maxPrice) => __awaiter(void 0, void 0, void 0, function* () {
    // Split the comma-separated string into an array of categories
    const categories = category ? category.split(',') : [];
    let filter = {};
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
    const products = yield product_model_1.Product.find(filter);
    return products;
});
const deleteProductByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const softDeleteById = yield product_model_1.Product.updateOne({ _id: id }, { isDeleted: true });
    return softDeleteById;
});
const getSingleProductByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById({ _id: id });
    return result;
});
const getProductCategoriesFomDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield product_model_1.Product.distinct('category');
        return categories;
    }
    catch (error) {
        throw new Error(`Failed to fetch product categories: ${error.message}`);
    }
});
exports.productServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    deleteProductByIdFromDB,
    getSingleProductByIdFromDB,
    getProductCategoriesFomDB
};
