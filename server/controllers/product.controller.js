import * as productService from '../services/product.service.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json({ products: products });
    } catch (error) {
        res.status(500).json({ error: error.message });;
    };
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productService.getProductById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        };
        res.json({ product: product });
    } catch (error) {
        res.status(500).json({ error: error.message });;
    };
};

export const createProduct = async (req, res) => {
    const product = req.body;
    try {
        const newProduct = await productService.addProduct(product);
        res.status(201).json({ success: true, product: newProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });;
    };
};