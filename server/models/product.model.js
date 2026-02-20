import mongoose from "mongoose";

const specificationsSchema = new mongoose.Schema({
    bluetooth: {
        type: Boolean,
        required: [true, "Bluetooth specification is required"],
    },
    noiseCancellation: {
        type: Boolean,
        required: [true, "Noise cancellation specification is required"],
    },
    batteryLife: {
        type: String,
        required: [true, "Battery life is required"],
    },
    color: {
        type: [String],
        required: [true, "At least one color is required"],
    },
});

const ProductSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: [true, 'Product brand is required'],
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
    },
    stock: {
        type: Number,
        required: [true, 'Product stock is required'],
    },
    image: {
        type: String,
        // required: [true, 'Product image is required'], // will add images later
    },
    specifications: specificationsSchema
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;