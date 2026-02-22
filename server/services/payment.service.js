import stripe from "../config/stripe.js";
import Order from "../models/Order.js";

export const createPaymentIntent = async (orderId) => {
    const order = await Order.findById(orderId);
    console.log("Order found for payment intent");

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.isPaid) {
        return res.status(400).json({ message: "Order already paid" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(order.totalPrice * 100),
        currency: "usd",
        metadata: {
            orderId: order._id.toString()
        }
    });

    // res.json({
    //     clientSecret: paymentIntent.client_secret
    // });

    return paymentIntent.client_secret;
};