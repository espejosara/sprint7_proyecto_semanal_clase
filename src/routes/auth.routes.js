import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

// Ruta para registrar un usuario
router.post('/api/auth/register', authController.register);

export default router;