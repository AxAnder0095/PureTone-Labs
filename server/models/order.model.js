import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    orderItems: [
        {
            product: mongoose.Schema.Types.ObjectId, // reference to Product
            name: String,
            quantity: Number,
            price: Number
        }
    ],
    customerInfo: {
        fullName: String,
        email: String,
        phone: String
    },
    shippingAddress: {
        address: String,
        city: String,
        postalCode: String,
        country: String
    },
    paymentInfo: {
        method: String, // 'stripe', 'paypal', etc.
        paymentId: String,
        status: String
    },
    totalPrice: Number,
    isPaid: Boolean,
    paidAt: Date,
    isDelivered: Boolean,
    deliveredAt: Date,
    orderStatus: String, // processing, shipped, delivered, cancelled
    createdAt: Date

});

const Order = mongoose.model('Order', OrderSchema);

export default Order;