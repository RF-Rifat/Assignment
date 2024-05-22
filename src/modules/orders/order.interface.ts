import { Document } from "mongoose";

export interface IOrder extends Document {
  email: string;
  productId: string;
  price: number;
  quantity: number;
}
