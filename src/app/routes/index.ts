import { Router } from "express";
import { productRoutes } from "../modules/Product Management/product.route";
import { userRoutes } from "../modules/User/user.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { cartRoutes } from "../modules/Cart/cart.route";

const router= Router();


const moduleRoutes=[
    {
        path:'/api',
        route:productRoutes,
    },
    {
        path:'/api',
        route:userRoutes,
    },
    {
        path:'/api',
        route:AuthRoutes,
    },
    {
        path:'/api',
        route:cartRoutes,
    }

];


moduleRoutes.forEach((route)=>router.use(route.path, route.route))

export default router;