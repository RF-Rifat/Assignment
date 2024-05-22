import mongoose, { Schema, Types } from "mongoose";
import { z } from "zod";
import { IOrder } from "./order.interface";

const orderSchemaZod = z.object({
  email: z.string().email(),
  productId: z.string().refine((id) => Types.ObjectId.isValid(id), {
    message: "Invalid productId format",
  }),
  price: z.number().positive(),
  quantity: z.number().min(1),
});

const OrderSchema: Schema = new Schema({
  email: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const Order = mongoose.model<IOrder>("Order", OrderSchema);

export const validateOrderData = (data: any) => {
  return orderSchemaZod.parse(data);
};

export default Order;
