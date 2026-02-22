import express from "express";
import stripe from "../config/stripe.js";
import Order from "../models/Order.js";

const router = express.Router();

router.post(
    "/stripe",
    express.raw({ type: "application/json" }),
    async (req, res) => {
        const sig = req.headers["stripe-signature"];

        let event;

        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (err) {
            console.log("Webhook signature failed", err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        if (event.type === "payment_intent.succeeded") {
            const intent = event.data.object;
            const orderId = intent.metadata.orderId;

            const order = await Order.findById(orderId);

            if (order && !order.isPaid) {
                order.isPaid = true;
                order.paidAt = new Date();
                order.paymentInfo.status = "paid";
                order.paymentInfo.paymentId = intent.id;
                order.orderStatus = "paid";

                await order.save();
            }
        }

        res.json({ received: true });
    }
);

export default router;