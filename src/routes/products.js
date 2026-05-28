import { Router } from 'express';
import * as productsController from '../controllers/products.js';

const router = Router();

router.get('/api/products', productsController.getAllProducts);

router.get('/api/products/:id', productsController.getProductById);

router.post('/api/products', productsController.createProduct);

router.put('/api/products/:id', productsController.updateProduct);

export default router;