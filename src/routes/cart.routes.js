import { Router } from 'express';
import * as cartController from '../controllers/cart.controller.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/api/cart', authenticate, cartController.getCart);
router.post('/api/cart/items', authenticate, cartController.addItem);
router.delete('/api/cart/items/:itemId', authenticate, cartController.removeItem);
router.post('/api/cart/checkout', authenticate, cartController.checkout);

export default router;
