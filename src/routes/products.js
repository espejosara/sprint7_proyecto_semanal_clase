import { Router } from 'express';
import * as productsController from '../controllers/products.js';

const router = Router();

router.get('/api/products', productsController.getAllProducts);

router.get('/api/products/:id', productsController.getProductById);

export default router;