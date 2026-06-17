import { Router } from 'express';
import * as wishlistController from '../controllers/wishlist.controller.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/api/wishlist', authenticate, wishlistController.getWishlist);
router.post('/api/wishlist/:productId', authenticate, wishlistController.toggleWishlist);

export default router;