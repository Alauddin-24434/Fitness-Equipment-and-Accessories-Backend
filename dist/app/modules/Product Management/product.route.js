"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.post('/products', product_controller_1.productControllers.createProduct);
router.get('/products', product_controller_1.productControllers.getAllProducts);
router.delete('/products/:id', product_controller_1.productControllers.deleteProductById);
router.get('/products/:id', product_controller_1.productControllers.getSingleProductById);
router.get('/products/catName', product_controller_1.productControllers.getProductCategories);
exports.productRoutes = router;
