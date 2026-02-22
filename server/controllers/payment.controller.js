import * as paymentServices from "../services/payment.service.js";

export const createPaymentIntent = async (req, res) => {
    const { orderId } = req.body;

    try {
        const clientSecret = await paymentServices.createPaymentIntent(orderId);
        res.json({ clientSecret });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};