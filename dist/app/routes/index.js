"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_route_1 = require("../modules/Product Management/product.route");
const user_route_1 = require("../modules/User/user.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const cart_route_1 = require("../modules/Cart/cart.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/api',
        route: product_route_1.productRoutes,
    },
    {
        path: '/api',
        route: user_route_1.userRoutes,
    },
    {
        path: '/api',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/api',
        route: cart_route_1.cartRoutes,
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
