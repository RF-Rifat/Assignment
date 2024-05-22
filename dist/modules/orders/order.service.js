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
exports.updateOrderById = exports.getOrderById = exports.getOrdersByUserEmail = exports.getAllOrders = exports.createOrder = void 0;
const order_model_1 = __importDefault(require("./order.model")); // Adjust import path as needed
const product_model_1 = __importDefault(require("../products/product.model"));
// Create a new order
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, quantity } = orderData;
        // Check if product exists
        const product = yield product_model_1.default.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }
        if (product.inventory.quantity < quantity) {
            throw new Error("Insufficient quantity available in inventory");
        }
        product.inventory.quantity -= quantity;
        product.inventory.inStock = product.inventory.quantity > 0;
        yield product.save();
        // Create the order
        const newOrder = new order_model_1.default(orderData);
        const savedOrder = yield newOrder.save();
        return savedOrder;
    }
    catch (error) {
        throw new Error(error.message);
    }
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
    try {
        const updatedOrder = yield order_model_1.default.findByIdAndUpdate(orderId, updateData, {
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
