import { Router } from "express";
import { productRoutes } from "../modules/Product Management/product.route";

const router= Router();


const moduleRoutes=[
    {
        path:'/api',
        route:productRoutes,
    }

];


moduleRoutes.forEach((route)=>router.use(route.path, route.route))

export default router;