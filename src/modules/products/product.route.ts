import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductsController,
  getSingleProductController,
  updateProduct,
} from "./product.controller";

const router = express.Router();

router.post("/", createProductController);
router.get("/", getProductsController);
router.get("/:productId", getSingleProductController);
router.delete("/:productId", deleteProductController);
router.put("/:productId", updateProduct);

export const productRoutes = router;
