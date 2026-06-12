import { Router } from 'express';
import * as productsController from '../controllers/products.js';
import { validateProduct } from '../middlewares/validateProduct.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/api/products', productsController.getAllProducts);
router.get('/api/products/:id', productsController.getProductById);

router.post('/api/products', authenticate, validateProduct, productsController.createProduct);
router.put('/api/products/:id', authenticate, validateProduct, productsController.updateProduct);
router.delete('/api/products/:id', authenticate, productsController.deleteProduct);

export default router;