import express, { Application, Request, Response } from 'express';
import cors from 'cors'

import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app :Application=express();


app.use(express.json());

const corsOptions = {
  origin: ['https://fitness-equipment-and-accessories-frontend.vercel.app','http://localhost:5173',],
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

// route
app.use(router)

app.get("/", (req: Request, res: Response) => {
    res.send("server is running on 5000");
  });





app.use(notFound)
export default app;
