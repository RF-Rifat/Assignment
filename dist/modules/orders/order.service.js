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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderById = exports.getOrderById = exports.getOrdersByUserEmail = exports.getAllOrders = exports.createOrder = void 0;
const order_model_1 = __importStar(require("./order.model"));
const product_model_1 = __importDefault(require("../products/product.model"));
// Create a new order
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate the order data
    const validatedData = (0, order_model_1.validateOrderData)(orderData);
    const { productId, quantity } = validatedData;
    // Check if product exists
    const product = yield product_model_1.default.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }
    // Calculate the quantity in stock
    const calculateQuantityInStock = (product) => {
        let totalQuantity = product.inventory.quantity; // Start with main inventory quantity
        // Add quantities from each variant
        if (product.variants && product.variants.length > 0) {
            product.variants.forEach((variant) => {
                if (variant.quantity) {
                    totalQuantity += variant.quantity;
                }
            });
        }
        return totalQuantity;
    };
    const quantityInStock = calculateQuantityInStock(product);
    if (quantityInStock < quantity) {
        throw new Error("Insufficient quantity available in inventory");
    }
    // Update the product's inventory
    product.inventory.quantity -= quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    yield product.save();
    // Create the order
    const newOrder = new order_model_1.default(validatedData);
    const savedOrder = yield newOrder.save();
    return savedOrder;
});
exports.createOrder = createOrder;
// Retrieve all orders
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_model_1.default.find();
        return orders;
    }
    catch (error) {
        throw new Error(`Failed to fetch orders: ${error.message}`);
    }
});
exports.getAllOrders = getAllOrders;
// Retrieve orders by user email
const getOrdersByUserEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_model_1.default.find({ email });
        return orders;
    }
    catch (error) {
        throw new Error(`Failed to fetch orders for email ${email}: ${error.message}`);
    }
});
exports.getOrdersByUserEmail = getOrdersByUserEmail;
// Retrieve a single order by ID
const getOrderById = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_model_1.default.findById(orderId);
        return order;
    }
    catch (error) {
        throw new Error(`Failed to fetch order with ID ${orderId}: ${error.message}`);
    }
});
exports.getOrderById = getOrderById;
// Update an order by ID
const updateOrderById = (orderId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate the update data
    const validatedData = (0, order_model_1.validateOrderData)(updateData);
    try {
        const updatedOrder = yield order_model_1.default.findByIdAndUpdate(orderId, validatedData, {
            new: true,
        });
        if (!updatedOrder) {
            throw new Error("Order not found");
        }
        return updatedOrder;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.updateOrderById = updateOrderById;
