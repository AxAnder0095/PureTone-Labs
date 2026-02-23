import mongoose from "mongoose";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

const ORDER_STATUS = {
    PROCESSING: "processing",
    PAID: "paid",
    SHIPPED: "shipped",
    DELIVERED: "delivered",
    CANCELLED: "cancelled",
    STRIPE: "stripe",
};

export const getAllOrders = () => Order.find().exec();

export const addOrder = async (orderData) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {
            orderItems,
            customerInfo,
            shippingAddress,
            paymentInfo,
            totalPrice,
        } = orderData;

        // Here you would typically check if the product exists and has enough stock
        for (const item of orderItems) {
            const product = await Product.findById(item.product).session(session);

            if (!product) {
                throw new Error(`Product with ID ${item.product} not found`);
            };

            if (product.stock < item.quantity) {
                throw new Error(`Not enough stock for product with ID ${item.product}`);
            };

            product.stock -= item.quantity;
            await product.save({ session });
        };

        // Create the order
        // Destructure the order data
        const [order] = await Order.create([
            {
                orderItems,
                customerInfo,
                shippingAddress,
                paymentInfo,
                totalPrice,
                isPaid: false,
                isDelivered: false,
                orderStatus: ORDER_STATUS.PROCESSING,
                createdAt: new Date()
            }
        ], { session });

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();
        return order;

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

export const markOrderAsPaid2 = async (orderId, paymentResult) => {
    const order = await Order.findById(orderId);

    if (!order) throw new Error("Order not found");

    order.isPaid = true;
    order.paidAt = new Date();

    order.paymentInfo = {
        method: "stripe", // or 'paypal', etc.
        paymentId: paymentResult.id,
        status: ORDER_STATUS.PAID
    };

    order.orderStatus = ORDER_STATUS.PAID;
    await order.save();
    return order;
};


export const markOrderAsPaid = async (orderId, intent) => {
    const order = await Order.findById(orderId);

    if (!order) throw new Error("Order not found");

    // Prevent double-processing (important for webhooks)
    if (order.isPaid) return order;

    order.isPaid = true;
    order.paidAt = new Date();

    order.paymentInfo = {
        method: ORDER_STATUS.STRIPE,
        paymentId: intent.id, // correct
        status: ORDER_STATUS.PAID
    };

    order.orderStatus = ORDER_STATUS.PAID;

    await order.save();
    return order;
};