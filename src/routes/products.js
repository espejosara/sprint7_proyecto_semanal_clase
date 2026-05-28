import { Router } from 'express';
import * as productsController from '../controllers/products.js';

const router = Router();

router.get('/api/products', productsController.getAllProducts);

router.get('/api/products/:id', productsController.getProductById);

router.post('/api/products', productsController.createProduct);

router.put('/api/products/:id', productsController.updateProduct);

router.delete('/api/products/:id', productsController.deleteProduct);

export default router;