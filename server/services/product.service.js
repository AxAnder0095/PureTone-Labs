import Product from '../models/product.model.js';

export const getAllProducts = () => Product.find();
export const getProductById = (id) => Product.findById(id);

export const addProduct = async (productData) => { // JSON object with name, price, description
    try {
        return await Product.create(productData);
    }catch (error) {
        throw new Error('Error adding product: ' + error.message);
    };
};



// Using save method to add a product with additional logic (e.g., setting isPremium based on price)
// const product = new Product(req.body);
// if (product.price > 1000) {
//   product.isPremium = true;
// }
// await product.save();

// Using create method to add a product directly, a shortcut for creating and saving a product in one step
// const newProduct = await Product.create(req.body);