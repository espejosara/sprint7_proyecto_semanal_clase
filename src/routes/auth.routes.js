import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

router.post('/api/auth/register', authController.register);

router.post('/api/auth/login', authController.login);

router.post('/api/auth/logout', authController.logout);

export default router;