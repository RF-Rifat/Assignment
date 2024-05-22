import Order from "./order.model"; // Adjust import path as needed
import { IOrder } from "./order.interface";
import Product from "../products/product.model";


// Create a new order
export const createOrder = async (orderData: IOrder): Promise<IOrder> => {
  try {
    const { productId, quantity } = orderData;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    
    }
    if (product.quantityInStock < quantity) {
      throw new Error("Insufficient quantity available in inventory");
    }

    product.quantityInStock -= quantity;
    product.inStock = product.quantityInStock > 0;
    await product.save();

    // Create the order
    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();
    return savedOrder;
  } catch (error:any) {
    throw new Error(error.message);
  }
};

// Retrieve all orders
export const getAllOrders = async (): Promise<IOrder[]> => {
  try {
    const orders = await Order.find();
    return orders;
  } catch (error:any) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
};

// Retrieve orders by user email
export const getOrdersByUserEmail = async (
  email: string
): Promise<IOrder[]> => {
  try {
    const orders = await Order.find({ email });
    return orders;
  } catch (error:any) {
    throw new Error(
      `Failed to fetch orders for email ${email}: ${error.message}`
    );
  }
};

// Retrieve a single order by ID
export const getOrderById = async (orderId: string): Promise<IOrder | null> => {
  try {
    const order = await Order.findById(orderId);
    return order;
  } catch (error:any) {
    throw new Error(
      `Failed to fetch order with ID ${orderId}: ${error.message}`
    );
  }
};

// Update an order by ID
export const updateOrderById = async (
  orderId: string,
  updateData: Partial<IOrder>
): Promise<IOrder | null> => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, {
      new: true,
    });
    if (!updatedOrder) {
      throw new Error("Order not found");
    }
    return updatedOrder;
  } catch (error:any) {
    throw new Error(error.message);
  }
};
