import { Router } from 'express';
import * as productsController from '../controllers/products.js';
import { validateProduct } from '../middlewares/validateProduct.js';

const router = Router();

router.get('/api/products', productsController.getAllProducts);

router.get('/api/products/:id', productsController.getProductById);

router.post('/api/products', validateProduct, productsController.createProduct);

router.put('/api/products/:id', validateProduct, productsController.updateProduct);

router.delete('/api/products/:id', productsController.deleteProduct);

export default router;