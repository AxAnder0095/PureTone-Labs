import express from 'express';
import { testController } from '../controllers/test.controller.js';
import e from 'express';

const router = express.Router();

// Test route
router.get('/test', testController);

export default router;