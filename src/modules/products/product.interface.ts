import { Document } from "mongoose";

interface IVariant {
  type: string;
  value: string;
}

interface IInventory {
  quantity: number;
  inStock: boolean;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: IVariant[];
  inventory: IInventory;
}
