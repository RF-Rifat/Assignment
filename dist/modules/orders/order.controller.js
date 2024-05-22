"use strict";
// order.controller.ts
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
exports.getOrdersByUserEmail = exports.getAllOrders = exports.createOrder = void 0;
const order_model_1 = __importDefault(require("./order.model")); // Adjust import path as needed
// Create a new order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, productId, price, quantity } = req.body;
        // Create a new order document
        const newOrder = new order_model_1.default({ email, productId, price, quantity });
        // Save the order to the database
        const savedOrder = yield newOrder.save();
        res.status(201).json({
            success: true,
            message: "Order created successfully!",
            data: savedOrder,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to create order", error: error.message });
    }
});
exports.createOrder = createOrder;
// Retrieve all orders
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_model_1.default.find();
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully!",
            data: orders,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to fetch orders", error: error.message });
    }
});
exports.getAllOrders = getAllOrders;
// Retrieve orders by user email
const getOrdersByUserEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userEmail = req.query.email;
        const userOrders = yield order_model_1.default.find({ email: userEmail });
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully for user email!",
            data: userOrders,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch orders for user email",
            error: error.message,
        });
    }
});
exports.getOrdersByUserEmail = getOrdersByUserEmail;
