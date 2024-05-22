import mongoose, { Schema } from "mongoose";
import { IProduct } from "./product.interface";

const variantSchema: Schema = new Schema({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const inventorySchema: Schema = new Schema({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  variants: [variantSchema],
  inventory: { type: inventorySchema, required: true },
});

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;
