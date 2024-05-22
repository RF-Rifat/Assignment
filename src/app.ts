import cors from "cors";
import express, { Request, Response } from "express";
import { productRoutes } from "./modules/products/product.route";
import { orderRoutes } from "./modules/orders/order.route";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req: Request, res: Response) => {
  console.log(req.url);
  res.send("Hello world!");
});

export default app;
