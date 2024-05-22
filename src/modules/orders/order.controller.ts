// order.controller.ts

import { Request, Response } from "express";
import Order from "./order.model"; // Adjust import path as needed

// Create a new order
export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, productId, price, quantity } = req.body;

    // Create a new order document
    const newOrder = new Order({ email, productId, price, quantity });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: savedOrder,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
};

// Retrieve all orders
export const getAllOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orders = await Order.find();

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      data: orders,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: error.message });
  }
};

// Retrieve orders by user email
export const getOrdersByUserEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userEmail = req.query.email as string;
    const userOrders = await Order.find({ email: userEmail });

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully for user email!",
      data: userOrders,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to fetch orders for user email",
      error: error.message,
    });
  }
};
