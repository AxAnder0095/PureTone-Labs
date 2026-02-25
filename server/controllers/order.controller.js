import * as  orderService from "../services/order.service.js";
import stripe from "../config/stripe.js";

export const getOrders = async (req, res) => {
    try{
        const orders = await orderService.getAllOrders();
        res.status(200).json(orders);
    }catch(error){
        res.status(500).json({ message: error.message });
    };
};

export const createCheckoutSession = async (req, res) => {
    try {
        const { cartItems } = req.body;
        const origin = req.headers.origin || process.env.CLIENT_URL || "http://localhost:5173";

        const session = await orderService.createCheckoutSession({ cartItems, origin });

        res.status(200).json({
            sessionId: session.id,
            url: session.url
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getCheckoutConfig = async (req, res) => {
    try {
        const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";
        const isTestMode = stripeSecretKey.startsWith("sk_test_");

        res.status(200).json({ isTestMode });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrderByCheckoutSession = async (req, res) => {
    try {
        const sessionId = req.query.session_id;

        if (!sessionId) {
            return res.status(400).json({ message: "Missing session_id query param" });
        }

        const order = await orderService.getOrderByCheckoutSessionId(sessionId);

        if (!order) {
            return res.status(404).json({ message: "Order not found for this checkout session" });
        }

        return res.status(200).json({ order });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const stripeWebhook = async (req, res) => {
    const signature = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        return res.status(500).json({ message: "Missing STRIPE_WEBHOOK_SECRET" });
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
    } catch (error) {
        return res.status(400).send(`Webhook signature verification failed: ${error.message}`);
    }

    try {
        if (event.type === "checkout.session.completed") {
            const checkoutSession = event.data.object;
            await orderService.finalizeOrderFromCheckoutSession(checkoutSession.id);
        }

        return res.status(200).json({ received: true });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
