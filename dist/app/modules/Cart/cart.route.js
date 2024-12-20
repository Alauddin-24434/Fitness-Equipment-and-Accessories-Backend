"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("./cart.controller");
const router = express_1.default.Router();
router.post('/carts', cart_controller_1.cartControllers.createCart);
router.get('/carts/:id', cart_controller_1.cartControllers.getAllCart);
router.delete('/carts/:id', cart_controller_1.cartControllers.deleteCartById);
router.delete('/carts/all/:id', cart_controller_1.cartControllers.deleteAllOnlySingleUser);
router.put('/carts/:id', cart_controller_1.cartControllers.updateCartById); // Add update route
exports.cartRoutes = router;
