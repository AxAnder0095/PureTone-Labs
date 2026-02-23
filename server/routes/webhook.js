import express from "express";
import stripe from "../config/stripe.js";
import { markOrderAsPaid } from "../services/order.service.js";
// import Order from "../models/Order.js";

const router = express.Router();

// Important Note: Client side does not call this endpoint directly. Stripe calls this 
// endpoint when a payment is successful. This is a webhook endpoint that Stripe 
// uses to notify our server about payment events. The client side will call the 
// createPaymentIntent endpoint to create a payment intent and get the client secret, 
// but it does not call this webhook endpoint directly. Instead, Stripe calls this endpoint 
// when a payment is successful, and we use it to update the order status in our database accordingly.

// createPaymentIntent is called by the client side before the payment by stripe is processed. 
// This endpoint is called by the client side to create a payment intent and get the client secret, 
// which is then used by the client side to complete the payment process with Stripe. 
// The webhook endpoint ("/stripe") is called by Stripe after the payment is successful 
// to update the order status in our database.

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

            if (!orderId) {
                console.error("Missing orderId in metadata");
                return res.status(400).end();
            }

            try {
                await markOrderAsPaid(orderId, intent);
            } catch (error) {
                console.error("Error marking order as paid:", error);
                return res.status(500).end();
            }

            // await markOrderAsPaid(orderId, intent);

            // if (order && !order.isPaid) {
            //     order.isPaid = true;
            //     order.paidAt = new Date();
            //     order.paymentInfo.status = "paid";
            //     order.paymentInfo.paymentId = intent.id;
            //     order.orderStatus = "paid";

            //     await order.save();
            // }
        }

        res.json({ received: true });
    }
);

export default router;