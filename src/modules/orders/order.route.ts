import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrdersByUserEmail,
} from "./order.controller";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/", getOrdersByUserEmail);

export const orderRoutes = router;
