

import express from 'express';
import { productControllers } from './product.controller';


const router= express.Router();

router.post('/products', productControllers.createProduct);
router.get('/products', productControllers.getAllProducts);
router.delete('/products/:id', productControllers.deleteProductById);
router.get('/products/:id', productControllers.getSingleProductById);


export const productRoutes= router;
