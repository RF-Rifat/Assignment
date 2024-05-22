import { IProduct } from "./product.interface";
import Product, {
  validateProductData,
  validateProductUpdateData,
} from "./product.model";
import { z } from "zod";

class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseError";
  }
}

// Create a new product
export const createProduct = async (
  productData: IProduct
): Promise<IProduct> => {
  try {
    // Validate the product data
    validateProductData(productData);

    const product = await Product.create(productData);
    return product;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new DatabaseError(
        `Validation error: ${error.errors.map((e) => e.message).join(", ")}`
      );
    } else if (error instanceof Error) {
      throw new DatabaseError(`Error creating product: ${error.message}`);
    } else {
      throw new DatabaseError("Unknown error occurred while creating product");
    }
  }
};

// Get all products
export const getProducts = async (searchTerm?: string): Promise<IProduct[]> => {
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
    const products = await Product.find(query);
    return products;
  } catch (error) {
    if (error instanceof Error) {
      throw new DatabaseError(`Error retrieving products: ${error.message}`);
    } else {
      throw new DatabaseError(
        "Unknown error occurred while retrieving products"
      );
    }
  }
};

// Get a single product by ID
export const getSingleProduct = async (
  productId: string
): Promise<IProduct | null> => {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    if (error instanceof Error) {
      throw new DatabaseError(
        `Error retrieving product with ID ${productId}: ${error.message}`
      );
    } else {
      throw new DatabaseError(
        `Unknown error occurred while retrieving product with ID ${productId}`
      );
    }
  }
};

// Delete a product by ID
export const deleteProduct = async (
  productId: string
): Promise<IProduct | null> => {
  try {
    const product = await Product.findByIdAndDelete(productId);
    return product;
  } catch (error) {
    if (error instanceof Error) {
      throw new DatabaseError(
        `Error deleting product with ID ${productId}: ${error.message}`
      );
    } else {
      throw new DatabaseError(
        `Unknown error occurred while deleting product with ID ${productId}`
      );
    }
  }
};

// Update a product by ID
export const updateProduct = async (
  productId: string,
  updateData: Partial<IProduct>
): Promise<IProduct | null> => {
  try {
    // Validate the update data
    validateProductUpdateData(updateData);

    const product = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
    });
    return product;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new DatabaseError(
        `Validation error: ${error.errors.map((e) => e.message).join(", ")}`
      );
    } else if (error instanceof Error) {
      throw new DatabaseError(
        `Error updating product with ID ${productId}: ${error.message}`
      );
    } else {
      throw new DatabaseError(
        `Unknown error occurred while updating product with ID ${productId}`
      );
    }
  }
};
