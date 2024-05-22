import mongoose, { Schema } from "mongoose";
import { z } from "zod";
import { IProduct } from "./product.interface";

const variantSchemaZod = z.object({
  type: z.string().nonempty(),
  value: z.string().nonempty(),
});

const inventorySchemaZod = z.object({
  quantity: z.number().min(0),
  inStock: z.boolean(),
});

const productSchemaZod = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  price: z.number().positive(),
  category: z.string().nonempty(),
  tags: z.array(z.string().nonempty()).optional(),
  variants: z.array(variantSchemaZod),
  inventory: inventorySchemaZod,
});

// Define Mongoose schemas
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

export const validateProductData = (data: any) => {
  return productSchemaZod.parse(data);
};

export const validateProductUpdateData = (data: any) => {
  return productSchemaZod.partial().parse(data);
};

export default Product;
