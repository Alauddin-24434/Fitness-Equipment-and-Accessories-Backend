

import express from 'express';
import { productControllers } from './product.controller';


const router= express.Router();

router.post('/products', productControllers.createProduct);
router.get('/products', productControllers.getAllProducts);
router.get('/products', productControllers.searchProducts);

export const productRoutes= router;
