import mongoose from "mongoose";


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
        required: [true, 'Product image is required'], 
    }
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;