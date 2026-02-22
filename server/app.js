import express from 'express';
import cors from 'cors';
import testRoute from './routes/test.route.js';
import productRoute from './routes/product.route.js';
import orderRoutes from './routes/order.route.js';
import webhookRoute from './routes/webhook.js';

// Create Express app
const app = express();

 // Middleware
app.use(cors({
	origin: 'http://localhost:5173',
}));

app.use('/api', webhookRoute);
app.use(express.json());

// Routes
app.use('/api', testRoute);
app.use('/api', productRoute);
app.use('/api', orderRoutes);
export default app;