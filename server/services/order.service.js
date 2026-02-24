import mongoose from "mongoose";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import stripe from "../config/stripe.js";

const ORDER_STATUS = {
    PROCESSING: "processing",
    PAID: "paid",
    SHIPPED: "shipped",
    DELIVERED: "delivered",
    CANCELLED: "cancelled",
    STRIPE: "stripe",
};

export const getAllOrders = () => Order.find().exec();
export const getOrderByCheckoutSessionId = (sessionId) => Order.findOne({ checkoutSessionId: sessionId }).exec();

export const createCheckoutSession = async ({ cartItems, origin }) => {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        throw new Error("Cart is empty");
    }

    const normalizedItems = cartItems.map((item) => {
        const productId = String(item._id || item.id || item.productId || "");

        if (!productId) {
            throw new Error("Each cart item must include a product id");
        }

        return {
            productId,
            name: item.brand,
            description: item.description,
            image: item.image,
            price: Number(item.price),
            quantity: Number(item.quantity || 1)
        };
    });

    const totalPrice = normalizedItems.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
    );

    const lineItems = normalizedItems.map((item) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: item.name,
                description: item.description,
                images: item.image ? [item.image] : [],
                metadata: {
                    productId: item.productId
                }
            },
            unit_amount: Math.round(item.price * 100)
        },
        quantity: item.quantity
    }));

    const checkoutSession = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: lineItems,
        billing_address_collection: "required",
        phone_number_collection: {
            enabled: true
        },
        shipping_address_collection: {
            allowed_countries: ["US", "CA"]
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: 0,
                        currency: "usd"
                    },
                    display_name: "Standard Shipping",
                    delivery_estimate: {
                        minimum: {
                            unit: "business_day",
                            value: 3
                        },
                        maximum: {
                            unit: "business_day",
                            value: 5
                        }
                    }
                }
            }
        ],
        success_url: `${origin}/order-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/cart?checkout=cancelled`,
        metadata: {
            cartSize: String(normalizedItems.length)
        }
    });

    await Order.create({
        checkoutSessionId: checkoutSession.id,
        orderItems: normalizedItems.map((item) => ({
            product: item.productId,
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
        totalPrice,
        currency: "usd",
        paymentInfo: {
            method: ORDER_STATUS.STRIPE,
            paymentId: "",
            status: ORDER_STATUS.PROCESSING
        },
        orderStatus: "pending_payment"
    });

    return checkoutSession;
};

export const finalizeOrderFromCheckoutSession = async (sessionId) => {
    console.log("inside finalizeOrderFromCheckoutSession");
    const existingOrder = await Order.findOne({ checkoutSessionId: sessionId });

    if (!existingOrder) {
        throw new Error("Order not found for checkout session");
    }

    if (existingOrder.isPaid) {
        console.log("Order already marked as paid, skipping processing");
        return existingOrder;
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["shipping_details"]
    });

    const dbSession = await mongoose.startSession();
    dbSession.startTransaction();

    try {
        for (const item of existingOrder.orderItems) {
            if (!item.product) {
                continue;
            }

            const product = await Product.findById(item.product).session(dbSession);

            if (!product) {
                throw new Error(`Product with ID ${item.product} not found`);
            }

            if (product.stock < item.quantity) {
                throw new Error(`Not enough stock for product with ID ${item.product}`);
            }

            product.stock -= item.quantity;
            await product.save({ session: dbSession });
        }

        existingOrder.customerInfo = {
            fullName: checkoutSession.customer_details?.name || "",
            email: checkoutSession.customer_details?.email || "",
            phone: checkoutSession.customer_details?.phone || ""
        };

        existingOrder.shippingAddress = {
            address: checkoutSession.shipping_details?.address?.line1 || "",
            city: checkoutSession.shipping_details?.address?.city || "",
            postalCode: checkoutSession.shipping_details?.address?.postal_code || "",
            country: checkoutSession.shipping_details?.address?.country || ""
        };

        existingOrder.paymentInfo = {
            method: ORDER_STATUS.STRIPE,
            paymentId: String(checkoutSession.payment_intent || ""),
            status: ORDER_STATUS.PAID
        };

        existingOrder.currency = checkoutSession.currency || "usd";
        existingOrder.totalPrice = Number((checkoutSession.amount_total || 0) / 100);
        existingOrder.isPaid = true;
        existingOrder.paidAt = new Date();
        existingOrder.orderStatus = ORDER_STATUS.PAID;

        await existingOrder.save({ session: dbSession });

        await dbSession.commitTransaction();
        dbSession.endSession();
        return existingOrder;
    } catch (error) {
        await dbSession.abortTransaction();
        dbSession.endSession();
        throw error;
    }
};























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

// export const markOrderAsPaid2 = async (orderId, paymentResult) => {
//     const order = await Order.findById(orderId);

//     if (!order) throw new Error("Order not found");

//     order.isPaid = true;
//     order.paidAt = new Date();

//     order.paymentInfo = {
//         method: "stripe", // or 'paypal', etc.
//         paymentId: paymentResult.id,
//         status: ORDER_STATUS.PAID
//     };

//     order.orderStatus = ORDER_STATUS.PAID;
//     await order.save();
//     return order;
// };


// export const markOrderAsPaid = async (orderId, intent) => {
//     const order = await Order.findById(orderId);

//     if (!order) throw new Error("Order not found");

//     // Prevent double-processing (important for webhooks)
//     if (order.isPaid) return order;

//     order.isPaid = true;
//     order.paidAt = new Date();

//     order.paymentInfo = {
//         method: ORDER_STATUS.STRIPE,
//         paymentId: intent.id, // correct
//         status: ORDER_STATUS.PAID
//     };

//     order.orderStatus = ORDER_STATUS.PAID;

//     await order.save();
//     return order;
// };