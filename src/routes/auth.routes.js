import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

// Ruta para registrar un usuario
router.post('/api/auth/register', authController.register);

// Ruta para iniciar sesión
router.post('/api/auth/login', authController.login);

export default router;