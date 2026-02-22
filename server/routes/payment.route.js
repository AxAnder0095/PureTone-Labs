import express from "express";
import * as paymentControllers from "../controllers/payment.controller.js";


const router = express.Router();

router.post("/payment", paymentControllers.createPaymentIntent);

export default router;