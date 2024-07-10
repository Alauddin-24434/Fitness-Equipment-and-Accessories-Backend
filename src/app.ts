import express, { Application, Request, Response } from 'express';
import cors from 'cors'

import notFound from './app/middlewares/notFound';
import router from './app/routes';
import { Product } from './app/modules/Product Management/product.model';
const app :Application=express();


app.use(express.json());
app.use(cors());

// route
app.use(router)

app.get("/", (req: Request, res: Response) => {
    res.send("server is running on 5000");
  });





app.use(notFound)
export default app;
