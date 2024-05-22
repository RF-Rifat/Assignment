"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProductUpdateData = exports.validateProductData = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const zod_1 = require("zod");
const variantSchemaZod = zod_1.z.object({
    type: zod_1.z.string().nonempty(),
    value: zod_1.z.string().nonempty(),
});
const inventorySchemaZod = zod_1.z.object({
    quantity: zod_1.z.number().min(0),
    inStock: zod_1.z.boolean(),
});
const productSchemaZod = zod_1.z.object({
    name: zod_1.z.string().nonempty(),
    description: zod_1.z.string().nonempty(),
    price: zod_1.z.number().positive(),
    category: zod_1.z.string().nonempty(),
    tags: zod_1.z.array(zod_1.z.string().nonempty()).optional(),
    variants: zod_1.z.array(variantSchemaZod),
    inventory: inventorySchemaZod,
});
// Define Mongoose schemas
const variantSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    value: { type: String, required: true },
});
const inventorySchema = new mongoose_1.Schema({
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
});
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    variants: [variantSchema],
    inventory: { type: inventorySchema, required: true },
});
const Product = mongoose_1.default.model("Product", productSchema);
const validateProductData = (data) => {
    return productSchemaZod.parse(data);
};
exports.validateProductData = validateProductData;
const validateProductUpdateData = (data) => {
    return productSchemaZod.partial().parse(data);
};
exports.validateProductUpdateData = validateProductUpdateData;
exports.default = Product;
