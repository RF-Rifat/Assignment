"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProductController = exports.getSingleProductController = exports.getProductsController = exports.createProductController = void 0;
const product_service_1 = require("./product.service");
const product_model_1 = __importDefault(require("./product.model"));
// Controller to create a new product
const createProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (0, product_service_1.createProduct)(req.body);
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: product,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res
                .status(500)
                .json({ message: "Unknown error occurred while creating product" });
        }
    }
});
exports.createProductController = createProductController;
// Controller to get all products
const getProductsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const products = yield (0, product_service_1.getProducts)(searchTerm);
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: products,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res
                .status(500)
                .json({ message: "Unknown error occurred while retrieving products" });
        }
    }
});
exports.getProductsController = getProductsController;
// Controller to get a single product by ID
const getSingleProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (0, product_service_1.getSingleProduct)(req.params.productId);
        if (product) {
            res.status(200).json({
                success: true,
                message: "Product fetched successfully!",
                data: product,
            });
        }
        else {
            res.status(404).json({ message: "Product not found" });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({
                message: `Unknown error occurred while retrieving product with ID ${req.params.id}`,
            });
        }
    }
});
exports.getSingleProductController = getSingleProductController;
// Controller to delete a product by ID
const deleteProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (0, product_service_1.deleteProduct)(req.params.productId);
        if (product) {
            res
                .status(200)
                .json({ message: "Product deleted successfully!", data: null });
        }
        else {
            res.status(404).json({ message: "Product not found" });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({
                message: `Unknown error occurred while deleting product with ID ${req.params.id}`,
            });
        }
    }
});
exports.deleteProductController = deleteProductController;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const updateData = req.body;
    try {
        const product = yield product_model_1.default.findByIdAndUpdate(productId, updateData, {
            new: true,
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: product,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.updateProduct = updateProduct;
