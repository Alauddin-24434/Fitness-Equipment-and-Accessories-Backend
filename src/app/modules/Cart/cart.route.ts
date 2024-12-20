

import express from 'express';
import { cartControllers } from './cart.controller';

const router= express.Router();

router.post('/carts', cartControllers.createCart);

router.get('/carts/:id', cartControllers.getAllCart);
router.delete('/carts/:id', cartControllers.deleteCartById);
router.delete('/carts/all/:id', cartControllers.deleteAllOnlySingleUser);
router.put('/carts/:id', cartControllers.updateCartById); // Add update route

export const cartRoutes= router;
