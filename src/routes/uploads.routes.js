import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { requireRole } from '../middlewares/requireRole.js';
import uploadProductImageMiddleware from '../middlewares/uploadProductImage.js';
import * as uploadsController from '../controllers/uploads.controller.js';

const router = Router();

router.post(
  '/api/uploads/products',
  authenticate,
  requireRole('ADMIN'),
  uploadProductImageMiddleware.single('image'),
  uploadsController.uploadProductImage
);

export default router;
