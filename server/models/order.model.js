import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    checkoutSessionId: {
        type: String,
        index: true,
        sparse: true,
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1,
            },
            price: {
                type: Number,
                required: true,
                min: 0,
            }
        }
    ],
    customerInfo: {
        fullName: {
            type: String,
            default: "",
        },
        email: {
            type: String,
            default: "",
        },
        phone: {
            type: String,
            default: "",
        }
    },
    shippingAddress: {
        address: {
            type: String,
            default: "",
        },
        city: {
            type: String,
            default: "",
        },
        postalCode: {
            type: String,
            default: "",
        },
        country: {
            type: String,
            default: "",
        }
    },
    paymentInfo: {
        method: {
            type: String,
            default: "stripe",
        },
        paymentId: {
            type: String,
            default: "",
        },
        status: {
            type: String,
            default: "pending",
        }
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    currency: {
        type: String,
        default: "usd",
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paidAt: Date,
    isDelivered: {
        type: Boolean,
        default: false,
    },
    deliveredAt: Date,
    orderStatus: {
        type: String,
        enum: ["pending_payment", "processing", "paid", "shipped", "delivered", "cancelled"],
        default: "pending_payment",
    },
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

export default Order;