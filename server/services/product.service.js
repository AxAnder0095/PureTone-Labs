import Product from '../models/product.model.js';

export const getAllProducts = () => Product.find();
export const getProductById = (id) => Product.findById(id);

export const addProduct = (productData) => { // JSON object with name, price, description
    if (!productData.name || !productData.price || !productData.description) {
        throw new Error('Missing required fields');
    };

    try {
        const newProduct = new Product(productData);
        return newProduct.save();
    }catch (error) {
        throw new Error('Error adding product: ' + error.message);
    };
};

