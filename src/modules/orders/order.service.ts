import Order, { validateOrderData } from "./order.model";
import { IOrder } from "./order.interface";
import Product from "../products/product.model";

// Create a new order
export const createOrder = async (orderData: IOrder): Promise<IOrder> => {
  // Validate the order data
  const validatedData = validateOrderData(orderData);

  const { productId, quantity } = validatedData;

  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  // Calculate the quantity in stock
  const calculateQuantityInStock = (product: any): number => {
    let totalQuantity = product.inventory.quantity; // Start with main inventory quantity

    // Add quantities from each variant
    if (product.variants && product.variants.length > 0) {
      product.variants.forEach((variant: { quantity: number }) => {
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
  await product.save();

  // Create the order
  const newOrder = new Order(validatedData);
  const savedOrder = await newOrder.save();
  return savedOrder;
};

// Retrieve all orders
export const getAllOrders = async (): Promise<IOrder[]> => {
  try {
    const orders = await Order.find();
    return orders;
  } catch (error: any) {
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
  } catch (error: any) {
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
  } catch (error: any) {
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
  // Validate the update data
  const validatedData = validateOrderData(updateData);

  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, validatedData, {
      new: true,
    });
    if (!updatedOrder) {
      throw new Error("Order not found");
    }
    return updatedOrder;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
