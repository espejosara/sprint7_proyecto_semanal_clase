import { Router } from 'express';
import * as reviewsController from '../controllers/reviews.controller.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/api/products/:id/reviews', reviewsController.getReviews);
router.post('/api/products/:id/reviews', authenticate, reviewsController.createReview);

export default router;