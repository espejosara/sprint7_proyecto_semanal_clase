import { Router } from 'express';
import * as productsController from '../controllers/products.controller.js';
import { validateProduct } from '../middlewares/validateProduct.js';
import { authenticate } from '../middlewares/authenticate.js';
import { requireRole } from '../middlewares/requireRole.js';
import { adminLogger } from '../middlewares/adminLogger.js';

const router = Router();

router.get('/api/products', productsController.getAllProducts);
router.get('/api/products/:id', productsController.getProductById);

router.post('/api/products', authenticate, requireRole('ADMIN'), adminLogger, validateProduct, productsController.createProduct);
router.put('/api/products/:id', authenticate, requireRole('ADMIN'), adminLogger, validateProduct, productsController.updateProduct);
router.delete('/api/products/:id', authenticate, requireRole('ADMIN'), adminLogger, productsController.deleteProduct);

export default router;