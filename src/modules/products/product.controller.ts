import { Request, Response } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
} from "./product.service";
import { IProduct } from "./product.interface";
import Product from "./product.model";

// Controller to create a new product
export const createProductController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await createProduct(req.body);
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: product,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Unknown error occurred while creating product" });
    }
  }
};

// Controller to get all products
export const getProductsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const searchTerm = req.query.searchTerm as string | undefined;
    const products = await getProducts(searchTerm);
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: products,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Unknown error occurred while retrieving products" });
    }
  }
};

// Controller to get a single product by ID
export const getSingleProductController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await getSingleProduct(req.params.productId);
    if (product) {
      res.status(200).json({
        success: true,
        message: "Product fetched successfully!",
        data: product,
      });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({
        message: `Unknown error occurred while retrieving product with ID ${req.params.id}`,
      });
    }
  }
};

// Controller to delete a product by ID
export const deleteProductController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await deleteProduct(req.params.productId);
    if (product) {
      res
        .status(200)
        .json({ message: "Product deleted successfully!", data: null });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({
        message: `Unknown error occurred while deleting product with ID ${req.params.id}`,
      });
    }
  }
};


export const updateProduct = async (req: Request, res: Response) => {
  const productId = req.params.productId;
  const updateData = req.body;

  try {
    const product = await Product.findByIdAndUpdate(productId, updateData, {
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
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
