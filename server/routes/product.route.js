import express from 'express';
import * as productControllers from '../controllers/product.controller.js';

const router = express.Router();

// Controllers for receiving products
router.get('/products', productControllers.getAllProducts);
router.get('/products/:id', productControllers.getProductById);

// Controller for adding a new product
router.post('/products', productControllers.createProduct);

export default router;