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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProduct = exports.getSingleProduct = exports.getProducts = exports.createProduct = void 0;
const product_model_1 = __importStar(require("./product.model"));
const zod_1 = require("zod");
class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = "DatabaseError";
    }
}
// Create a new product
const createProduct = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate the product data
        (0, product_model_1.validateProductData)(productData);
        const product = yield product_model_1.default.create(productData);
        return product;
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            throw new DatabaseError(`Validation error: ${error.errors.map((e) => e.message).join(", ")}`);
        }
        else if (error instanceof Error) {
            throw new DatabaseError(`Error creating product: ${error.message}`);
        }
        else {
            throw new DatabaseError("Unknown error occurred while creating product");
        }
    }
});
exports.createProduct = createProduct;
// Get all products
const getProducts = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        if (searchTerm) {
            query = {
                $or: [
                    { name: { $regex: searchTerm, $options: "i" } },
                    { description: { $regex: searchTerm, $options: "i" } },
                ],
            };
        }
        const products = yield product_model_1.default.find(query);
        return products;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new DatabaseError(`Error retrieving products: ${error.message}`);
        }
        else {
            throw new DatabaseError("Unknown error occurred while retrieving products");
        }
    }
});
exports.getProducts = getProducts;
// Get a single product by ID
const getSingleProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.findById(productId);
        return product;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new DatabaseError(`Error retrieving product with ID ${productId}: ${error.message}`);
        }
        else {
            throw new DatabaseError(`Unknown error occurred while retrieving product with ID ${productId}`);
        }
    }
});
exports.getSingleProduct = getSingleProduct;
// Delete a product by ID
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.findByIdAndDelete(productId);
        return product;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new DatabaseError(`Error deleting product with ID ${productId}: ${error.message}`);
        }
        else {
            throw new DatabaseError(`Unknown error occurred while deleting product with ID ${productId}`);
        }
    }
});
exports.deleteProduct = deleteProduct;
// Update a product by ID
const updateProduct = (productId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate the update data
        (0, product_model_1.validateProductUpdateData)(updateData);
        const product = yield product_model_1.default.findByIdAndUpdate(productId, updateData, {
            new: true,
        });
        return product;
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            throw new DatabaseError(`Validation error: ${error.errors.map((e) => e.message).join(", ")}`);
        }
        else if (error instanceof Error) {
            throw new DatabaseError(`Error updating product with ID ${productId}: ${error.message}`);
        }
        else {
            throw new DatabaseError(`Unknown error occurred while updating product with ID ${productId}`);
        }
    }
});
exports.updateProduct = updateProduct;
