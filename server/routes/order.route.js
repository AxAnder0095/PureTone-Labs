import express from "express";
import * as  orderControllers from "../controllers/order.controller.js";

const router = express.Router();

// Routes for orders
router.get("/orders", orderControllers.getOrders);
// router.get("/orders/:userId",);

router.post("/orders", orderControllers.createOrder);

export default router;