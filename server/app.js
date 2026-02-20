import express from 'express';
// import cors from 'cors';
import testRoute from './routes/test.route.js';
import productRoute from './routes/product.route.js';

// Create Express app
const app = express();

 // Middleware
// app.use(cors()); // Allow requests from the React frontend running on localhost:5173
app.use(express.json());

// Routes
app.use('/api', testRoute);
app.use('/api', productRoute);

export default app;