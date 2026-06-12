import { Router } from 'express';
import * as productsController from '../controllers/products.js';
import { validateProduct } from '../middlewares/validateProduct.js';
import { authenticate } from '../middlewares/authenticate.js';
import { requireRole } from '../middlewares/requireRole.js';

const router = Router();

router.get('/api/products', productsController.getAllProducts);
router.get('/api/products/:id', productsController.getProductById);

router.post('/api/products', authenticate, requireRole('ADMIN'), validateProduct, productsController.createProduct);
router.put('/api/products/:id', authenticate, requireRole('ADMIN'), validateProduct, productsController.updateProduct);
router.delete('/api/products/:id', authenticate, requireRole('ADMIN'), productsController.deleteProduct);

export default router;