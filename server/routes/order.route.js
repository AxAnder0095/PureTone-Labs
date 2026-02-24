import express from "express";
import * as  orderControllers from "../controllers/order.controller.js";

const router = express.Router();

// Routes for orders
router.get("/orders", orderControllers.getOrders);
router.get("/orders/checkout-config", orderControllers.getCheckoutConfig);
router.get("/orders/by-checkout-session", orderControllers.getOrderByCheckoutSession);
// router.get("/orders/:userId",);

router.post("/orders/checkout-session", orderControllers.createCheckoutSession);
// router.post("/orders", orderControllers.createOrder);

export default router;